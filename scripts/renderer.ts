import { CharacterSheet } from "./CharSheet"

let sheet = new CharacterSheet();

$("div.abilities .base").change((event) => {
    var elem = $(this);
    sheet[elem.attr("id")] = elem.val();
    alert('changed ' + elem.attr("id") + ' to ' + sheet[elem.attr("id")]);
});