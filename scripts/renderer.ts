import { CharacterSheet } from "./CharSheet"
import * as $ from "jquery"

let sheet = new CharacterSheet();

function recalcSheet() {
    $("div[data-value-from]").trigger("charSheet:recalc");
}

$("div[data-value-from]").on("charSheet:recalc", (event) => {
    var elem = $(event.currentTarget);
    var funcName = elem.attr("data-value-from");
    var value = sheet[funcName]();
    elem.find("input").val(value);
});

$("div[data-field-name]>input").change((event) => {
    var elem = $(event.currentTarget);
    sheet[elem.parent().attr("data-field-name")] = +elem.val();
    recalcSheet();
});