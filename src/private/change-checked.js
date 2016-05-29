/**
 * This method toggles checked attribute.
 * @param {jQuery} flipswitch This argument is jQuery of element that has 'jq-flipswitch' class.
 */
var _changeChecked = function(flipswitch) {
    if (!( flipswitch instanceof jQuery)) {
        return;
    }

    var checkbox = flipswitch.children('[type="checkbox"]');

    if (checkbox.length === 0) {
        return;
    }

    checkbox[0].checked = !checkbox[0].checked;
};
