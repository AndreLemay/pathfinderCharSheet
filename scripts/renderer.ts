import { remote } from "electron"
import * as jetpack from "fs-jetpack"
import * as path from "path"
import { CharacterSheet, Skill } from "./CharSheet"
import * as $ from "jquery"

let sheet = new CharacterSheet();

function recalcSheet() {
    $("div[data-value-output]>input, div[data-skill-name]").trigger("charSheet:recalc");
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
        if (typeof sheet[prop] === 'function')
            value = sheet[prop]();
        else value = sheet[prop];
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
        let loadPath = path.join(remote.app.getPath("appData"), "pfCharSheets", "charSave.sav");
        sheet = CharacterSheet.load(jetpack.read(loadPath, "json"));
        initFields();
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
        sheet[elem.parent().attr("data-value-input")] = +elem.val();
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
    $("div[data-value-input]>input, div[data-value-input]>select").attr("value", function () {
        var sheetProp = $(this).parent().attr("data-value-input");
        return sheet[sheetProp];
    });
    $("div[data-skill-input]>input[type='number']").attr("value", function () {
        var parentSkill = $(this).closest("div[data-skill-name]").attr("data-skill-name");
        return sheet.skills[parentSkill][$(this).attr("data-skill-input")];
    });
    $("div[data-skill-input]>input[type='checkbox']").prop("checked", function () {
        var parentSkill = $(this).closest("div[data-skill-name]").attr("data-skill-name");
        return sheet.skills[parentSkill][$(this).attr("data-skill-input")];
    });

    //recalculate
    $("div[data-value-output]>input, div[data-skill-name]").trigger("charSheet:recalc");
}

initEvents();
initFields();