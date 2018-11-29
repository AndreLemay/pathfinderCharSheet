import { CharacterSheet } from "./CharSheet"
import * as $ from "jquery"

let sheet = new CharacterSheet();

function recalcSheet() {
    $("div[data-value-output]>input").trigger("charSheet:recalc");
}

$("div[data-value-output]>input").on("charSheet:recalc", (event) => {
    var elem = $(event.currentTarget);
    var outputFrom = elem.parent().attr("data-value-output");
    var value = sheet[outputFrom];
    if (typeof value === 'function')
        value = value();
    elem.attr("value", value);
});

$("div[data-value-input]>input").change((event) => {
    var elem = $(event.currentTarget);
    sheet[elem.parent().attr("data-value-input")] = +elem.val();
    recalcSheet();
});

//disable all outputs
$("div[data-value-output]>input").prop("disabled", true);

//initialize inputs to default values
$("div[data-value-input]>input").attr("value", function () {
    var sheetProp = $(this).parent().attr("data-value-input");
    return sheet[sheetProp];
});

//trigger initial calculation
$("div[data-value-output]>input").trigger("charSheet:recalc");