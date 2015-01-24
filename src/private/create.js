/**
 * This method is to initialize plugin and return HTMLElement that wraps the parts for flip-switch.
 * In concrete, this method creates elements and adds style or class.
 * @param {HTMLElement} element This argument is the 2nd argument in $.fn.each method.
 * @param {object} settings This argument is object for plugin setting.
 * @return {HTMLElement} This value is HTMLElement that wraps the parts for flip-switch.
 */
var _create = function(element, settings) {
    if (!$.isPlainObject(settings)) {
        return;
    }

    // Initialize
    var self = null;

    if ((element instanceof HTMLInputElement) && (element.getAttribute('type') === 'checkbox')) {
        // <input type="checkbox" />
        self = $('<div />');

        $(element).hide()
                  .before(self)
                  .appendTo(self);
    } else if (!(element instanceof HTMLInputElement) && (element instanceof HTMLElement)) {
        // Otherwise (<div> ...etc)
        self = $(element);
    } else {
        return null;
    }

    var texts = {
        left  : '',
        right : ''
    };

    if ($.isPlainObject(settings.texts)) {
        texts.left  = settings.texts.left  || 'ON';
        texts.right = settings.texts.right || 'OFF';
    }

    var cursor = 'pointer';

    if ($.isPlainObject(settings.cursors)) {
        cursor = settings.cursors.normal || 'pointer';
    }

    // Create child elements
    var flipper       = $('<div class="' + UI_CLASSES.FLIPPER + '"></div>');
    var textContainer = $('<div />');
    var textLeft      = $('<div class="' + UI_CLASSES.TEXT_LEFT  + '"></div>').text(texts.left);
    var textRight     = $('<div class="' + UI_CLASSES.TEXT_RIGHT + '"></div>').text(texts.right);

    // Set style
    var halfWidth  = (parseInt(parseInt(settings.width) / 2) + 'px');
    var height     = (parseInt(settings.height) + 'px');
    var initClass  = (settings.init === FLIPPER_STATES.LEFT) ? UI_CLASSES.FLIPPER_LEFT : UI_CLASSES.FLIPPER_RIGHT;
    var initLeft   = (settings.init === FLIPPER_STATES.LEFT) ? '0px' : halfWidth;

    self.css({
        'cursor'   : cursor,
        'position' : 'relative',
        'top'      : '0px',
        'left'     : '0px',
        'z-index'  : 1,
        'width'    : (parseInt(settings.width) + 'px'),
        'height'   : height
    });

    flipper.css({
        'cursor'   : cursor,
        'position' : 'absolute',
        'top'      : '0px',
        'left'     : initLeft,
        'z-index'  : 3,
        'width'    : halfWidth,
        'height'   : height
    });

    textLeft.css({
        'position'    : 'absolute',
        'top'         : '0px',
        'left'        : '0px',
        'z-index'     : 2,
        'width'       : halfWidth,
        'line-height' : height,
        'text-align'  : 'center'
    });

    textRight.css({
        'position'    : 'absolute',
        'top'         : '0px',
        'right'       : '0px',
        'z-index'     : 2,
        'width'       : halfWidth,
        'line-height' : height,
        'text-align'  : 'center'
    });

    // Add elements
    textContainer.append(textLeft).append(textRight);

    self.addClass(UI_CLASSES.FLIP_SWITCH + ' ' + initClass)
        .append(flipper)
        .append(textContainer);

    return self[0];  // HTMLElement
};
