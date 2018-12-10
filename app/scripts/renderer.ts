import { remote } from "electron"
import * as jetpack from "fs-jetpack"
import * as path from "path"
import {
    CharacterSheet, Skill, Equipment, ValueBonus, BonusType, StatType,
    Alignment, Gender, Size, ArmourType, SkillName, Weapon, Feat
} from "./CharSheet"
import * as $ from "jquery"
import "bootstrap"

/* Remove this stuff when finished, just a debug menu */
let rightClickPosition = null
const menu = new remote.Menu()
const menuItem = new remote.MenuItem({
    label: 'Inspect Element',
    click: () => {
        remote.getCurrentWindow().webContents.inspectElement(rightClickPosition.x, rightClickPosition.y)
    }
})
menu.append(menuItem)

window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    rightClickPosition = { x: e.x, y: e.y }
    menu.popup({
        window: remote.getCurrentWindow()
    })
}, false)
/* --------------------------------------------------- */

let sheet = new CharacterSheet()
let tempEquip: Equipment = null
let tempWeapon: Weapon = null
let teampFeat: Feat = null

function recalcSheet() {
    $("div[data-value-output]>input, div[data-skill-name]").trigger("charSheet:recalc")    
    //also need to re-render attacks as they won't be picked up by the sheet recalc, and might be affected by damage bonuses
    renderAttacks()
}

function renderEnumToDropdown(dropdownSelector: string, enumType: any /*typescript is weird so just take any...*/) {
    Object.keys(enumType).forEach((type: any) => {
        if (isNaN(type)) {
            $(dropdownSelector).append(`<option value="${enumType[type]}">${type}</option>`)
        }
    })
}

function renderEquipment() {
    //clear before re-rendering
    $(".equipment-container").empty()

    sheet.equipment.forEach((item: Equipment) => {
        var html: string =
            `<div class="equipment-item">
                <div class="form-row align-items-center">
                    <div class="col-2"><label>Name</label></div>
                    <div class="col-10">
                        <input type="text" class="form-control form-control-sm form-control-plaintext" readonly value="${item.name}">
                    </div>
                </div>
                <div class="form-row align-items-center">
                    <div class="col-2"><label>Properties</label></div>
                    <div class="col-10">
                        <textarea class="form-control form-control-sm form-control-plaintext" readonly>${item.bonusesToString(true)}\n${item.description}</textarea>
                    </div>
                </div>
            </div>`

        $(".equipment-container").append(html)
    })
}

function renderFeats() {
    //clear before re-rendering
    $(".feat-container").empty()

    sheet.feats.forEach((item: Feat, index: number) => {
        var html: string =
            `<div class="feat-item" data-feat-index="${index}">
                <div class="form-row align-items-center">
                    <div class="col-3"><label>Name</label></div>
                    <div class="col-6">
                        <input type="text" class="form-control form-control-sm form-control-plaintext" readonly value="${item.name}">
                    </div>
                    <div class="col-3">
                        <label class="switch">
                            <input type="checkbox" checked>
                            <span class="slider round"></span>
                            <span class="absolute-no">Off</span>
                        </label>
                    </div>
                </div>
                <div class="form-row align-items-center">
                    <div class="col-3"><label>Properties</label></div>
                    <div class="col-9">
                        <textarea class="form-control form-control-sm form-control-plaintext" readonly>${item.bonusesToString(true)}\n${item.description}</textarea>
                    </div>
                </div>
            </div>`

        $(".feat-container").append(html)
        $(`div[data-feat-index="${index}"] .switch>input`).change((event) => {
            var elem = $(event.currentTarget)[0] as HTMLInputElement
            item.active = elem.checked
            recalcSheet()
        })
    })
}

function renderAttacks() {
    //clear before re-rendering
    $(".attack-container").empty()

    sheet.equipment.filter((item) => { return item instanceof Weapon }).forEach((item: Weapon) => {
        var html: string =
            `<div class="form-row align-items-end">
                <div class="col-4 form-group">
                    <label>Name</label>
                    <input readonly class="form-control form-control-sm form-control-plaintext" value="${item.name}">
                </div>
                <div class="col-8 form-group">
                    <label>Properties</label>
                    <textarea readonly class="form-control form-control-sm form-control-plaintext">${item.bonusesToString(true)}\n${item.description}</textarea>
                </div>
                <div class="col-4 form-group">
                    <label>Range</label>
                    <input readonly class="form-control form-control-sm form-control-plaintext" value="${item.range}">
                </div>
                <div class="col-4 form-group">
                    <label>Type</label>
                    <input readonly class="form-control form-control-sm form-control-plaintext" value="${item.damageType.join("/")}">
                </div>
                <div class="col-4 form-group">
                    <label>Damage</label>
                    <input readonly class="form-control form-control-sm form-control-plaintext" value="${item.damageAmount}d${item.damageDie} + ${sheet.calcMiscDamageBonus()}">
                </div>
                <div class="col-4 form-group">
                    <label>Critical</label>
                    <input readonly class="form-control form-control-sm form-control-plaintext" value="${item.critRange}-20x${item.critMultiplier}">
                </div>
            </div>`

        $(".attack-container").append(html)
    })
}

function getSheetProp(prop: string, skillName: string = null) {
    var value
    if (skillName) {
        var skill: Skill = sheet.skills[skillName]
        if (typeof skill[prop] === 'function')
            value = skill[prop]()
        else value = skill[prop]
    }
    else {
        var objWithProp = sheet
        //if we have a composite property, loop throug to get to the one we want to set
        var ind = 0
        while ((ind = prop.indexOf(".")) > 0) {
            objWithProp = objWithProp[prop.slice(0, ind)]
            prop = prop.slice(ind + 1)
        }

        if (typeof objWithProp[prop] === 'function')
            value = objWithProp[prop]()
        else value = objWithProp[prop]
    }

    return value
}

function initEvents() {
    //save button
    $("#saveButton").click(() => {
        let savePath = path.join(remote.app.getPath("appData"), "pfCharSheets", sheet.characterName + ".sav")
        jetpack.write(savePath, sheet.save())
    })

    //load button
    $("#loadButton").click(() => {
        remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
            defaultPath: path.join(remote.app.getPath("appData"), "pfCharSheets"),
            filters: [{ name: "Character Save Files", extensions: ["sav"] }],
            properties: ["openFile"]
        }, (paths: string[]) => {
            if (paths.length > 0) {
                let loadPath = paths[0]
                sheet = CharacterSheet.load(jetpack.read(loadPath, "json"))
                initFields()
            }
        })
    })

    //basic outputs
    $("div[data-value-output]>input").on("charSheet:recalc", (event) => {
        var elem = $(event.currentTarget)
        var outputFrom = elem.parent().attr("data-value-output")
        elem.attr("value", getSheetProp(outputFrom))
    })

    //basic inputs
    $("div[data-value-input]>input, div[data-value-input]>select").change((event) => {
        var elem = $(event.currentTarget)
        var tagName = elem.prop("tagName")
        var sheetVal: any = elem.val()
        var sheetProp = elem.parent().attr("data-value-input")
        var objWithProp = sheet

        //force the type to what CharacterSheet will expect
        if (elem.attr("type") === "number") {
            sheetVal = +sheetVal
        }
        else if (elem.attr("type") === "checkbox") {
            sheetVal = !!sheetVal
        }

        //if we have a composite property, loop throug to get to the one we want to set
        var ind = 0
        while ((ind = sheetProp.indexOf(".")) > 0) {
            objWithProp = objWithProp[sheetProp.slice(0, ind)]
            sheetProp = sheetProp.slice(ind + 1)
        }

        objWithProp[sheetProp] = sheetVal
        recalcSheet()
    })

    //skill outputs
    $("div[data-skill-name]").on("charSheet:recalc", (event) => {
        var elem = $(event.currentTarget)
        var skillName = elem.attr("data-skill-name")
        elem.find("div[data-skill-output]>input").each((index, input) => {
            var outputFrom = $(input).parent().attr("data-skill-output")
            if ($(input).attr("type") === "checkbox")
                $(input).prop("checked", getSheetProp(outputFrom, skillName))
            else $(input).attr("value", getSheetProp(outputFrom, skillName))
        })
    })

    //skill inputs
    $("div[data-skill-input]>input").change((event) => {
        var elem = $(event.currentTarget)
        var parentSkill = elem.closest("div[data-skill-name]").attr("data-skill-name")
        if (elem.attr("type") === "checkbox")
            sheet.skills[parentSkill][elem.parent().attr("data-skill-input")] = !!elem.prop("checked")
        else
            sheet.skills[parentSkill][elem.parent().attr("data-skill-input")] = +elem.val()
        recalcSheet()
    })
}

function initFields() {
    //disable all outputs
    $("div[data-value-output]>input:not(:checkbox),div[data-skill-output]>input:not(:checkbox)").prop("readonly", true).addClass("form-control-plaintext")
    $("div[data-value-output]>input:checkbox,div[data-skill-output]>input:checkbox").prop("disabled", true)

    //initialize inputs to default values
    $("div[data-value-input]>input, div[data-value-input]>select").each((index, elem) => {
        var sheetProp = $(elem).parent().attr("data-value-input")

        if ($(elem).attr("type") === "checkbox")
            $(elem).prop("checked", getSheetProp(sheetProp))
        else if ($(elem).prop("tagName") === "SELECT")
            $(elem).val(getSheetProp(sheetProp)).change()
        else $(elem).attr("value", getSheetProp(sheetProp))
    })
    $("div[data-skill-input]>input").each((index, elem) => {
        var parentSkill = $(elem).closest("div[data-skill-name]").attr("data-skill-name")
        var skillProp = $(elem).parent().attr("data-skill-input")
        if ($(elem).attr("type") === "checkbox")
            $(elem).prop("checked", sheet.skills[parentSkill][skillProp])
        else $(elem).attr("value", sheet.skills[parentSkill][skillProp])
    })

    //recalculate
    $("div[data-value-output]>input, div[data-skill-name]").trigger("charSheet:recalc")
}

function initEquipmentModal() {
    //initialize the var we use to store the modal values
    $("#addEquipmentModal").on("show.bs.modal", () => {
        tempEquip = new Equipment("", "")
    })

    //make sure we don't accidentally hold on to values after the modal closes
    //also clear the fields
    $("#addEquipmentModal").on("hidden.bs.modal", () => {
        tempEquip = null
        $("#addEquipmentModal input[id], #addEquipmentModal textarea[id]").val(null)
    })

    //map values from modal fields to Equipment object
    $("#addEquipmentModal #name").change((event) => {
        var elem = $(event.currentTarget)
        tempEquip.name = elem.val() + "" //force it to a string to make typescript happy
    })

    $("#addEquipmentModal #description").change((event) => {
        var elem = $(event.currentTarget)
        tempEquip.description = elem.val() + ""
    })

    //add properties
    $("#addEquipmentModal #addBonusButton").click(() => {
        //get values from the inputs (not importing types for these because string enums are a pain)
        var bonusType: BonusType = +$("#addEquipmentModal #bonusType").val()
        var affectedStat: StatType = +$("#addEquipmentModal #affectedStat").val()
        var bonusAmount = +$("#addEquipmentModal #bonusAmount").val()

        var bonus: ValueBonus = new ValueBonus(
            affectedStat,
            null,
            bonusType,
            bonusAmount
        )

        tempEquip.bonuses.push(bonus)
        $("#addEquipmentModal #properties").val(tempEquip.bonusesToString())
    })

    $("#addEquipmentModal #addSkillBonusButton").click(() => {
        //get values from the inputs (not importing types for these because string enums are a pain)
        var bonusType: BonusType = +$("#addEquipmentModal #skillBonusType").val()
        var affectedskill: SkillName = +$("#addEquipmentModal #affectedSkill").val()
        var bonusAmount = +$("#addEquipmentModal #skillBonusAmount").val()

        var bonus: ValueBonus = new ValueBonus(
            null,
            affectedskill,
            bonusType,
            bonusAmount
        )

        tempEquip.bonuses.push(bonus)
        $("#addEquipmentModal #properties").val(tempEquip.bonusesToString())
    })

    //add equipment to the sheet
    $("#addEquipmentModal #addEquipmentButton").click(() => {
        sheet.equipment.push(tempEquip)

        $("#addEquipmentModal").modal('hide')
        renderEquipment()
        recalcSheet()
    })
}

function initFeatModal() {
    //initialize the var we use to store the modal values
    $("#addFeatModal").on("show.bs.modal", () => {
        teampFeat = new Feat("", "")
    })

    //make sure we don't accidentally hold on to values after the modal closes
    //also clear the fields
    $("#addFeatModal").on("hidden.bs.modal", () => {
        teampFeat = null
        $("#addFeatModal input[id], #addFeatModal textarea[id]").val(null)
    })

    //map values from modal fields to Equipment object
    $("#addFeatModal #name").change((event) => {
        var elem = $(event.currentTarget)
        teampFeat.name = elem.val() + "" //force it to a string to make typescript happy
    })

    $("#addFeatModal #description").change((event) => {
        var elem = $(event.currentTarget)
        teampFeat.description = elem.val() + ""
    })

    //add properties
    $("#addFeatModal #addBonusButton").click(() => {
        //get values from the inputs (not importing types for these because string enums are a pain)
        var bonusType: BonusType = +$("#addFeatModal #bonusType").val()
        var affectedStat: StatType = +$("#addFeatModal #affectedStat").val()
        var bonusAmount = +$("#addFeatModal #bonusAmount").val()

        var bonus: ValueBonus = new ValueBonus(
            affectedStat,
            null,
            bonusType,
            bonusAmount
        )

        teampFeat.bonuses.push(bonus)
        $("#addFeatModal #properties").val(teampFeat.bonusesToString())
    })

    $("#addFeatModal #addSkillBonusButton").click(() => {
        //get values from the inputs (not importing types for these because string enums are a pain)
        var bonusType: BonusType = +$("#addFeatModal #skillBonusType").val()
        var affectedskill: SkillName = +$("#addFeatModal #affectedSkill").val()
        var bonusAmount = +$("#addFeatModal #skillBonusAmount").val()

        var bonus: ValueBonus = new ValueBonus(
            null,
            affectedskill,
            bonusType,
            bonusAmount
        )

        teampFeat.bonuses.push(bonus)
        $("#addFeatModal #properties").val(teampFeat.bonusesToString())
    })

    //add equipment to the sheet
    $("#addFeatModal #addFeatButton").click(() => {
        sheet.feats.push(teampFeat)

        $("#addFeatModal").modal('hide')
        renderFeats()
        recalcSheet()
    })
}

function initAttackModal() {
    //initialize the var we use to store the modal values
    $("#addAttackModal").on("show.bs.modal", () => {
        tempWeapon = new Weapon("", "")
    })

    //make sure we don't accidentally hold on to values after the modal closes
    //also clear the fields
    $("#addAttackModal").on("hidden.bs.modal", () => {
        tempWeapon = null
        $("#addAttackModal input[id], #addAttackModal textarea[id]").val(null)
    })

    //map values from modal fields to Equipment object
    $("#addAttackModal #name").change((event) => {
        var elem = $(event.currentTarget)
        tempWeapon.name = elem.val() + "" //force it to a string to make typescript happy
    })

    $("#addAttackModal #description").change((event) => {
        var elem = $(event.currentTarget)
        tempWeapon.description = elem.val() + ""
    })

    $("#addAttackModal #range").change((event) => {
        var elem = $(event.currentTarget)
        tempWeapon.range = +elem.val()
    })

    $("#addAttackModal input[name='damageType']").change((event) => {
        var elem = $(event.currentTarget)
        var val = elem.val() + ""
        if (elem.prop("checked"))
            tempWeapon.damageType.push(val)
        else 
            tempWeapon.damageType.splice(tempWeapon.damageType.indexOf(val), 1)
    })

    $("#addAttackModal #damageAmount").change((event) => {
        var elem = $(event.currentTarget)
        tempWeapon.damageAmount = +elem.val()
    })

    $("#addAttackModal #damageDie").change((event) => {
        var elem = $(event.currentTarget)
        tempWeapon.damageDie = +elem.val()
    })

    $("#addAttackModal #critRange").change((event) => {
        var elem = $(event.currentTarget)
        tempWeapon.critRange = +elem.val()
    })

    $("#addAttackModal #critMultiplier").change((event) => {
        var elem = $(event.currentTarget)
        tempWeapon.critMultiplier = +elem.val()
    })

    //add properties
    $("#addAttackModal #addBonusButton").click(() => {
        //get values from the inputs (not importing types for these because string enums are a pain)
        var bonusType: BonusType = +$("#addAttackModal #bonusType").val()
        var affectedStat: StatType = +$("#addAttackModal #affectedStat").val()
        var bonusAmount = +$("#addAttackModal #bonusAmount").val()

        var bonus: ValueBonus = new ValueBonus(
            affectedStat,
            null,
            bonusType,
            bonusAmount
        )

        tempWeapon.bonuses.push(bonus)
        $("#addAttackModal #properties").val(tempWeapon.bonusesToString())
    })

    $("#addAttackModal #addSkillBonusButton").click(() => {
        //get values from the inputs (not importing types for these because string enums are a pain)
        var bonusType: BonusType = +$("#addAttackModal #skillBonusType").val()
        var affectedskill: SkillName = +$("#addAttackModal #affectedSkill").val()
        var bonusAmount = +$("#addAttackModal #skillBonusAmount").val()

        var bonus: ValueBonus = new ValueBonus(
            null,
            affectedskill,
            bonusType,
            bonusAmount
        )

        tempWeapon.bonuses.push(bonus)
        $("#addAttackModal #properties").val(tempWeapon.bonusesToString())
    })

    //add equipment to the sheet
    $("#addAttackModal #addAttackButton").click(() => {
        sheet.equipment.push(tempWeapon)

        $("#addAttackModal").modal('hide')
        renderEquipment()
        renderAttacks()
        recalcSheet()
    })
}

function initDropdowns() {
    renderEnumToDropdown("#addEquipmentModal #bonusType", BonusType)
    renderEnumToDropdown("#addEquipmentModal #skillBonusType", BonusType)
    renderEnumToDropdown("#addEquipmentModal #affectedStat", StatType)
    renderEnumToDropdown("#addEquipmentModal #affectedSkill", SkillName)
    renderEnumToDropdown("#addAttackModal #bonusType", BonusType)
    renderEnumToDropdown("#addAttackModal #skillBonusType", BonusType)
    renderEnumToDropdown("#addAttackModal #affectedStat", StatType)
    renderEnumToDropdown("#addAttackModal #affectedSkill", SkillName)
    renderEnumToDropdown("#addFeatModal #bonusType", BonusType)
    renderEnumToDropdown("#addFeatModal #skillBonusType", BonusType)
    renderEnumToDropdown("#addFeatModal #affectedStat", StatType)
    renderEnumToDropdown("#addFeatModal #affectedSkill", SkillName)
    renderEnumToDropdown("div[data-value-input='alignment']>select", Alignment)
    renderEnumToDropdown("div[data-value-input='gender']>select", Gender)
    renderEnumToDropdown("div[data-value-input='size']>select", Size)
    renderEnumToDropdown("div[data-value-input='armour.type']>select", ArmourType)
}

initDropdowns()
initEvents()
initFields()
initEquipmentModal()
initFeatModal()
initAttackModal()
renderEquipment()
renderFeats()
renderAttacks()