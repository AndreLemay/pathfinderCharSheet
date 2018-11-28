import { CharacterSheet } from "./CharSheet"
import * as $ from "jquery"

let sheet = new CharacterSheet();

$("div.abilities .base").change((event) => {
    var elem = $(event.currentTarget);
    sheet[elem.attr("id")] = elem.val();
    alert('changed ' + elem.attr("id") + ' to ' + sheet[elem.attr("id")]);
});