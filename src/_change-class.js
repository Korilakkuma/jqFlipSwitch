/**
 * This method toggles class of element that has 'jq-flipswitch' class.
 * @param {jQuery} flipswitch This argument is jQuery of element that has 'jq-flipswitch' class.
 * @param {FLIPPER_STATES} state This argument is either 'left' or 'right'.
 */
var _changeClass = function(flipswitch, state) {
    if (!(flipswitch instanceof jQuery)) {
        return;
    };

    switch (state) {
        case FLIPPER_STATES.LEFT :
            flipswitch.removeClass(UI_CLASSES.FLIPPER_RIGHT).addClass(UI_CLASSES.FLIPPER_LEFT);
            break;
        case FLIPPER_STATES.RIGHT :
            flipswitch.removeClass(UI_CLASSES.FLIPPER_LEFT).addClass(UI_CLASSES.FLIPPER_RIGHT);
            break;
        default :
            break;
    }
};
