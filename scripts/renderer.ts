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

        //force the type to what CharacterSheet will expect
        if (elem.attr("type") === "number" || tagName === "SELECT") {
            sheetVal = +sheetVal;
        }
        else if (elem.attr("type") === "checkbox") {
            sheetVal = !!sheetVal;
        }

        sheet[elem.parent().attr("data-value-input")] = sheetVal;
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
            $(elem).prop("checked", sheet[sheetProp]);
        else if ($(elem).prop("tagName") === "SELECT")
            $(elem).val(sheet[sheetProp]).change();
        else $(elem).attr("value", sheet[sheetProp]);
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

initEvents();
initFields();