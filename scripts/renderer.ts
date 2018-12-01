import { remote } from "electron"
import * as jetpack from "fs-jetpack"
import * as path from "path"
import {
    CharacterSheet, Skill, Equipment, ValueBonus, BonusType, StatType,
    Alignment, Gender, Size, ArmourType
} from "./CharSheet"
import * as $ from "jquery"
import "bootstrap"

let sheet = new CharacterSheet();
let tempEquip: Equipment = null;

function recalcSheet() {
    $("div[data-value-output]>input, div[data-skill-name]").trigger("charSheet:recalc");
}

function renderEnumToDropdown(dropdownSelector: string, enumType: any /*typescript is weird so just take any...*/) {
    Object.keys(enumType).forEach((type: any) => {
        if (isNaN(type)) {
            $(dropdownSelector).append(`<option value="${enumType[type]}">${type}</option>`);
        }
    });
}

function renderEquipment() {
    //clear before re-rendering
    $(".equipment-container").empty();

    sheet.equipment.forEach((item: Equipment) => {
        var html: string =
            `<div class="form-row align-items-end equipment-item">
                <div class="col-3 form-group">
                    <label>Name</label>
                    <input type="text" class="form-control form-control-sm" disabled value="${item.name}">
                </div>
                <div class="col-9 form-group">
                    <label>Properties</label>
                    <input type="text" class="form-control form-control-sm" disabled id="properties" value="${item.bonusesToString(true)}">
                </div>
            </div>`;

        $(".equipment-container").append(html);
    });
}

function getSheetProp(prop: string, skillName: string = null) {
    var value;
    if (skillName) {
        var skill: Skill = sheet.skills[skillName];
        if (typeof skill[prop] === 'function')
            value = skill[prop]();
        else value = skill[prop];
    }
    else {
        var objWithProp = sheet;
        //if we have a composite property, loop throug to get to the one we want to set
        var ind = 0;
        while ((ind = prop.indexOf(".")) > 0) {
            objWithProp = objWithProp[prop.slice(0, ind)];
            prop = prop.slice(ind + 1);
        }

        if (typeof objWithProp[prop] === 'function')
            value = objWithProp[prop]();
        else value = objWithProp[prop];
    }

    return value;
}

function initEvents() {
    //save button
    $("#saveButton").click(() => {
        let savePath = path.join(remote.app.getPath("appData"), "pfCharSheets", sheet.characterName + ".sav");
        jetpack.write(savePath, sheet.save());
    });

    //load button
    $("#loadButton").click(() => {
        remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
            defaultPath: path.join(remote.app.getPath("appData"), "pfCharSheets"),
            filters: [{ name: "Character Save Files", extensions: ["sav"] }],
            properties: ["openFile"]
        }, (paths: string[]) => {
            if (paths.length > 0) {
                let loadPath = paths[0];
                sheet = CharacterSheet.load(jetpack.read(loadPath, "json"));
                initFields();
            }
        });
    });

    //basic outputs
    $("div[data-value-output]>input").on("charSheet:recalc", (event) => {
        var elem = $(event.currentTarget);
        var outputFrom = elem.parent().attr("data-value-output");
        elem.attr("value", getSheetProp(outputFrom));
    });

    //basic inputs
    $("div[data-value-input]>input, div[data-value-input]>select").change((event) => {
        var elem = $(event.currentTarget);
        var tagName = elem.prop("tagName");
        var sheetVal: any = elem.val();
        var sheetProp = elem.parent().attr("data-value-input");
        var objWithProp = sheet;

        //force the type to what CharacterSheet will expect
        if (elem.attr("type") === "number") {
            sheetVal = +sheetVal;
        }
        else if (elem.attr("type") === "checkbox") {
            sheetVal = !!sheetVal;
        }

        //if we have a composite property, loop throug to get to the one we want to set
        var ind = 0;
        while ((ind = sheetProp.indexOf(".")) > 0) {
            objWithProp = objWithProp[sheetProp.slice(0, ind)];
            sheetProp = sheetProp.slice(ind + 1);
        }

        objWithProp[sheetProp] = sheetVal;
        recalcSheet();
    });

    //skill outputs
    $("div[data-skill-name]").on("charSheet:recalc", (event) => {
        var elem = $(event.currentTarget);
        var skillName = elem.attr("data-skill-name");
        elem.find("div[data-skill-output]>input").each((index, input) => {
            var outputFrom = $(input).parent().attr("data-skill-output");
            if ($(input).attr("type") === "checkbox")
                $(input).prop("checked", getSheetProp(outputFrom, skillName));
            else $(input).attr("value", getSheetProp(outputFrom, skillName));
        });
    });

    //skill inputs
    $("div[data-skill-input]>input").change((event) => {
        var elem = $(event.currentTarget);
        var parentSkill = elem.closest("div[data-skill-name]").attr("data-skill-name");
        if (elem.attr("type") === "checkbox")
            sheet.skills[parentSkill][elem.parent().attr("data-skill-input")] = !!elem.prop("checked");
        else
            sheet.skills[parentSkill][elem.parent().attr("data-skill-input")] = +elem.val();
        recalcSheet();
    });
}

function initFields() {
    //disable all outputs
    $("div[data-value-output]>input,div[data-skill-output]>input").prop("disabled", true);

    //initialize inputs to default values
    $("div[data-value-input]>input, div[data-value-input]>select").each((index, elem) => {
        var sheetProp = $(elem).parent().attr("data-value-input");

        if ($(elem).attr("type") === "checkbox")
            $(elem).prop("checked", getSheetProp(sheetProp));
        else if ($(elem).prop("tagName") === "SELECT")
            $(elem).val(getSheetProp(sheetProp)).change();
        else $(elem).attr("value", getSheetProp(sheetProp));
    });
    $("div[data-skill-input]>input").each((index, elem) => {
        var parentSkill = $(elem).closest("div[data-skill-name]").attr("data-skill-name");
        var skillProp = $(elem).parent().attr("data-skill-input");
        if ($(elem).attr("type") === "checkbox")
            $(elem).prop("checked", sheet.skills[parentSkill][skillProp]);
        else $(elem).attr("value", sheet.skills[parentSkill][skillProp]);
    });

    //recalculate
    $("div[data-value-output]>input, div[data-skill-name]").trigger("charSheet:recalc");
}

function initModal() {
    //initialize the var we use to store the modal values
    $("#addEquipmentModal").on("show.bs.modal", () => {
        tempEquip = new Equipment("");
    });

    //make sure we don't accidentally hold on to values after the modal closes
    //also clear the fields
    $("#addEquipmentModal").on("hidden.bs.modal", () => {
        tempEquip = null;
        $("#addEquipmentModal input[id], #addEquipmentModal textarea[id]").val(null);
    });

    //map values from modal fields to Equipment object
    $("#addEquipmentModal #name").change((event) => {
        var elem = $(event.currentTarget);
        tempEquip.name = elem.val() + ""; //force it to a string to make typescript happy
    });

    //add properties
    $("#addEquipmentModal #addBonusButton").click(() => {
        //get values from the inputs (not importing types for these because string enums are a pain)
        var bonusType: BonusType = +$("#addEquipmentModal #bonusType").val();
        var affectedStat: StatType = +$("#addEquipmentModal #affectedStat").val();
        var bonusAmount = +$("#addEquipmentModal #bonusAmount").val();

        var bonus: ValueBonus = new ValueBonus(
            affectedStat,
            bonusType,
            bonusAmount
        );

        tempEquip.bonuses.push(bonus);
        $("#addEquipmentModal #properties").val(tempEquip.bonusesToString());
    });

    //add equipment to the sheet
    $("#addEquipmentModal #addEquipmentButton").click(() => {
        sheet.equipment.push(tempEquip);

        $("#addEquipmentModal").modal('hide');
        renderEquipment();
    });
}

function initDropdowns() {
    renderEnumToDropdown("#addEquipmentModal #bonusType", BonusType);
    renderEnumToDropdown("#addEquipmentModal #affectedStat", StatType);
    renderEnumToDropdown("div[data-value-input='alignment']>select", Alignment);
    renderEnumToDropdown("div[data-value-input='gender']>select", Gender);
    renderEnumToDropdown("div[data-value-input='size']>select", Size);
    renderEnumToDropdown("div[data-value-input='armour.type']>select", ArmourType);
}

initDropdowns();
initEvents();
initFields();
initModal();
renderEquipment();