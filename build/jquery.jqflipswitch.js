/** 
 * jquery.jqflipswitch.js
 * @fileoverview jQuery Plugin for Flip-Switch
 *
 * Copyright 2014@Tomohiro IKEDA
 * Released under the MIT license
 */
 
 
 
(function($) {

    // This object wraps events
    var MOUSE_EVENTS = {};

    MOUSE_EVENTS.CLICK = 'click';

    // Touch Panel ?
    if (/iPhone|iPad|iPod|Android/.test(navigator.userAgent)) {
        MOUSE_EVENTS.START = 'touchstart';
        MOUSE_EVENTS.MOVE  = 'touchmove';
        MOUSE_EVENTS.END   = 'touchend';
    } else {
        MOUSE_EVENTS.START = 'mousedown';
        MOUSE_EVENTS.MOVE  = 'mousemove';
        MOUSE_EVENTS.END   = 'mouseup';
    }

    // These classes are added by plugin
    var UI_CLASSES = {};

    UI_CLASSES.FLIP_SWITCH   = 'jq-flipswitch';
    UI_CLASSES.FLIPPER       = 'jq-flipper';
    UI_CLASSES.FLIPPER_LEFT  = 'jq-flipper-left';
    UI_CLASSES.FLIPPER_RIGHT = 'jq-flipper-right';
    UI_CLASSES.TEXT_LEFT     = 'jq-flipswitch-text-left';
    UI_CLASSES.TEXT_RIGHT    = 'jq-flipswitch-text-right';

    // This object represents the flipper position
    var FLIPPER_STATES = {};

    FLIPPER_STATES.LEFT  = 'left';
    FLIPPER_STATES.RIGHT = 'right';

    var EVENT_TYPES = {};

    EVENT_TYPES.CLICK = 'click';
    EVENT_TYPES.FLIP  = 'flip';

    var EVENT_NAMESPACE = 'jq-flipswitch';

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
            switch (settings.type) {
                case EVENT_TYPES.CLICK :
                    cursor = settings.cursors.normal || 'pointer';
                    break;
                case EVENT_TYPES.FLIP :
                    cursor = settings.cursors.flip || 'pointer';
                    break;
                default :
                    break;
            }
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

    /**
     * This method invokes the designated callback.
     * @param {object} event This argument is the wrapped event object by jQuery.
     * @param {object} settings This argument is object for plugin setting.
     * @param {FLIPPER_STATES} state This argument is either 'left' or 'right'.
     */
    var _invokeCallback = function(event, settings, state) {
        if (!$.isPlainObject(event)
            || !('type' in event)
            || !$.isPlainObject(settings)
            || !$.isFunction(settings[event.type])) {
            return;
        }

        var ui = {};

        var value = null;

        if ($.isPlainObject(settings.values)) {
            value = settings.values[state];
        }

        ui.value = value;
        ui.state = state;

        settings[event.type](event, ui);
    };

    /**
     * This method is event listener that is invoked when flip-switch is clicked.
     * @param {object} event This argument is the wrapped event object by jQuery.
     * @param {object} settings This argument is object for plugin setting.
     */
    var _onclickListener = function(event, settings) {
        if ($(event.target).hasClass(UI_CLASSES.FLIPPER)) {
            // If event.target is the flipper, this method do nothing.
            return;
        }

        var self    = $(event.currentTarget);  // jQuery of flip-switch
        var flipper = self.children('.' + UI_CLASSES.FLIPPER);

        var duration = 0;
        var easing   = '';

        if ($.isPlainObject(settings.animates)) {
            duration = settings.animates.duration;
            easing   = settings.animates.easing;
        }

        var state = FLIPPER_STATES.LEFT;
        var left  = '0px';

        if (!/slow|fast/i.test(String(duration)) && (parseFloat(duration) < 0)) {
            duration = 0;
        }

        if (self.hasClass(UI_CLASSES.FLIPPER_LEFT)) {
            // to Right

            // Change state
            state = FLIPPER_STATES.RIGHT;

            // Re calculate position
            left = parseInt(self.width() / 2) + 'px';
        } else {
            // to Left

            // Change state
            state = FLIPPER_STATES.LEFT;
        }

        var animateCallback = function() {
            // Change class
            _changeClass(self, state);

            // Change checked for <input type="checkbox" />
            _changeChecked(self);

            // Trigger Event
            self.trigger('change', [settings, state]);
        };

        if (/slow|fast/i.test(String(duration)) || (duration > 0)) {
            flipper.animate({left : left}, duration, easing, animateCallback);
        } else {
            // Not animate
            flipper.css('left', left);
            animateCallback();
        }
    };

    /**
     * This method is event listener that is invoked after value is changed.
     * @param {object} event This argument is the wrapped event object by jQuery.
     * @param {object} settings This argument is object for plugin setting.
     * @param {FLIPPER_STATES} state This argument is either 'left' or 'right'.
     */
    var _onchangeListener = function(event, settings, state) {
        _invokeCallback(event, settings, state);
    };

    /**
     * This method is event listener that is invoked on the start of flip.
     * @param {object} event This argument is the wrapped event object by jQuery.
     * @param {object} settings This argument is object for plugin setting.
     * @param {FLIPPER_STATES} state This argument is either 'left' or 'right'.
     */
    var _onflipstartListener = function(event, settings, state) {
        _invokeCallback(event, settings, state);
    };

    /**
     * This method is event listener that is invoked during flip.
     * @param {object} event This argument is the wrapped event object by jQuery.
     * @param {object} settings This argument is object for plugin setting.
     */
    var _onflipListener = function(event, settings) {
        _invokeCallback(event, settings);
    };

    /**
     * This method is event listener that is invoked on the end of flip.
     * @param {object} event This argument is the wrapped event object by jQuery.
     * @param {object} settings This argument is object for plugin setting.
     * @param {FLIPPER_STATES} state This argument is either 'left' or 'right'.
     */
    var _onflipendListener = function(event, settings, state) {
        _invokeCallback(event, settings, state);
    };

    /**
     * This method adds event listener that is triggered after value changed.
     * @param {HTMLElement} element This argument is HTMLElement that wraps the parts for flip-switch.
     */
    var _addEventOnChange = function(element) {
        $(element).on(('change.' + EVENT_NAMESPACE), _onchangeListener);
    };

    /**
     * This method adds event listener that is invoked when flip-switch is clicked.
     * @param {HTMLElement} element This argument is HTMLElement that wraps the parts for flip-switch.
     * @param {object} settings This argument is object for plugin setting.
     */
    var _addEventOnClick = function(element, settings) {
        $(element).on((MOUSE_EVENTS.CLICK + '.' + EVENT_NAMESPACE), function(event) {
            _onclickListener(event, settings);
        });
    };

    /**
     * This method adds event listener that is invoked when flip-switch is flipped.
     * @param {HTMLElement} element This argument is HTMLElement that wraps the parts for flip-switch.
     * @param {object} settings This argument is object for plugin setting.
     */
    var _addEventOnFlip = function(element, settings) {
        var self    = $(element);
        var flipper = self.children('.' + UI_CLASSES.FLIPPER);

        var getX = function(event, flipper) {
            var flipswitch = flipper.parent();
            var x          = event.pageX - flipswitch.offset().left;

            var width     = parseInt(settings.width);
            var halfWidth = parseInt(width / 2);

            if (flipswitch.hasClass(UI_CLASSES.FLIPPER_LEFT)) {
                if (x > halfWidth) {
                    x = halfWidth;
                }
            } else {
                if (x > width) {
                    x = width;
                }

                x -= halfWidth;
            }

            if (x < 0) {
                x = 0;
            }

            return x;
        };

        var getStates = function(event, targetFlipper) {
            var state     = '';
            var changed   = false;
            var threshold = settings.threshold;
            var halfWidth = parseInt(settings.width) / 2;
            var x         = getX(event, targetFlipper);

            if (targetFlipper.parent().hasClass(UI_CLASSES.FLIPPER_LEFT)) {
                // from Left
                if (x >= threshold) {
                    // to Right
                    state   = FLIPPER_STATES.RIGHT;
                    changed = true;
                } else {
                    // Revert
                    state = FLIPPER_STATES.LEFT;
                }
            } else {
                // from Right
                if (x <= (halfWidth - threshold)) {
                    // to Left
                    state   = FLIPPER_STATES.LEFT;
                    changed = true;
                } else {
                    // Revert
                    state = FLIPPER_STATES.RIGHT;
                }
            }

            return {state : state, changed : changed};
        };

        var onstartListener = function(event) {
            // Trigger Event
            var state = '';

            if (self.hasClass(UI_CLASSES.FLIPPER_LEFT)) {
                state = FLIPPER_STATES.LEFT;
            } else {
                state = FLIPPER_STATES.RIGHT;
            }

            self.trigger('flipstart', [settings, state]);

            flipper.data('isDown', true);
            $(window).data('target', flipper);
        };

        var onmoveListener = function(event) {
            if (!flipper.data('isDown')) {
                return;
            }

            var cursor = 'ew-resize';

            if ($.isPlainObject(settings.cursors)) {
                cursor = settings.cursors.flip || 'ew-resize';
            }

            flipper.css('cursor', cursor)
                   .css('left', (getX(event, flipper) + 'px'));

            // Trigger Event
            self.trigger('flip', [settings]);
        };

        var onupListener = function(event) {
            var targetFlipper = $(window).data('target') || null;

            if ((targetFlipper === null) || !targetFlipper.data('isDown')) {
                return;
            }

            var flipswitch = targetFlipper.parent();
            var states     = getStates(event, targetFlipper);
            var left       = parseInt(parseInt(settings.width) / 2) + 'px';

            switch (states.state) {
                case FLIPPER_STATES.LEFT :
                    flipswitch.removeClass(UI_CLASSES.FLIPPER_RIGHT).addClass(UI_CLASSES.FLIPPER_LEFT);
                    targetFlipper.css('left', '0px');
                    break;
                case FLIPPER_STATES.RIGHT :
                    flipswitch.removeClass(UI_CLASSES.FLIPPER_LEFT).addClass(UI_CLASSES.FLIPPER_RIGHT);
                    targetFlipper.css('left', left);
                    break;
                default :
                    break;
            }

            flipswitch.trigger('flipend', [settings, states.state]);

            if (states.changed) {
                flipswitch.trigger('change', [settings, states.state]);
            }

            targetFlipper.removeData('isDown');
            $(window).removeData('target');
        };

        self.on(('flipstart.' + EVENT_NAMESPACE), _onflipstartListener);
        self.on(('flip.'      + EVENT_NAMESPACE), _onflipListener);
        self.on(('flipend.'   + EVENT_NAMESPACE), _onflipendListener);

        flipper.on((MOUSE_EVENTS.START + '.' + EVENT_NAMESPACE), onstartListener)
               .on((MOUSE_EVENTS.MOVE  + '.' + EVENT_NAMESPACE), onmoveListener);

        $(window).on((MOUSE_EVENTS.END + '.' + EVENT_NAMESPACE), onupListener);
    };

    /**
     * This method is public as plugin.
     * @param {object|string} method If this argument is object, the default settings are changed.
     *     If this argument is string, the designate method is invoked.
     * @return {jQuery|*} If this is jQuery, this is returned for method chain. Otherwise, this is getter for plugin settings.
     */
    $.fn.flipswitch = function(method) {
        var self = this;  // the instance of jQuery

        var methods = {
            /**
             * This method is to initialize plugin.
             * In concrete, this method creates elements and adds event listeners.
             * @param {object} options This argument is object for plugin setting.
             * @return {jQuery} This is returned for method chain.
             */
            create : function(options) {
                // Clear
                methods.destroy();

                // Decorate
                self.flipswitch.settings = $.extend(true, {}, self.flipswitch.defaults, options);

                return self.each(function(index, element) {
                    var settings   = $(element).flipswitch.settings;
                    var flipswitch = _create(element, settings);

                    // Remove Event Listener
                    $(flipswitch).off('.' + EVENT_NAMESPACE);

                    // Add Event Listener
                    _addEventOnChange(flipswitch, settings);

                    switch (settings.type) {
                        case EVENT_TYPES.CLICK :
                            _addEventOnClick(flipswitch, settings);
                            break;
                        case EVENT_TYPES.FLIP :
                            _addEventOnFlip(flipswitch, settings);
                            break;
                        default :
                            break;
                    }
                });
            },
            /**
             * This method is getter or setter for plugin settings.
             * @param {string} key This argument is property for settings.
             * @param {*} value This argument is new value for settings.
             *     If this argument is undefined, this method is getter.
             * @return {jQuery|*} If this is jQuery, this is returned for method chain.
             *    Otherwise, this is getter for plugin settings.
             */
            option : function(key, value) {
                if (value === undefined) {
                    // Getter
                    return self.flipswitch.settings[key];
                }

                // Setter
                self.flipswitch.settings[key] = value;

                var options = self.flipswitch.settings;

                return methods.create(options);
            },
            /**
             * This method removes elements and classes that are created by plugin.
             * @return {jQuery} This is returned for method chain.
             */
            destroy : function() {
                // Remove classes and elements
                var removedClasses = UI_CLASSES.FLIP_SWITCH  + ' '
                                   + UI_CLASSES.FLIPPER_LEFT + ' '
                                   + UI_CLASSES.FLIPPER_RIGHT;

                // Clear
                self.flipswitch.settings = {};

                return self.each(function(index, element) {
                    var flipswitch = null;

                    if ((element instanceof HTMLInputElement) && (element.getAttribute('type') === 'checkbox')) {
                        // <input type="checkbox" />
                        flipswitch = $(element).parent();

                        $(element).show().insertBefore(flipswitch);
                        flipswitch.remove();
                    } else {
                        // Otherwise
                        flipswitch = $(element);
                        flipswitch.removeClass(removedClasses).empty();
                    }
                });
            }
        };

        if (methods[String(method)]) {
            return methods[String(method)].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if ($.isPlainObject(method) || (method === undefined)) {
            return methods['create'](method);
        } else {
            $.error('jquery.jqflipswitch.js : The designated method ("' + method + '") is not defined.');
        }
    };

    // Settings by default
    $.fn.flipswitch.defaults = {
        type      : 'click',  // or 'flip'
        width     : 200,  // px
        height    : 50,   // px
        init      : FLIPPER_STATES.LEFT,
        threshold : 50,  // px
        cursors   : {
            normal : 'pointer',
            flip   : 'ew-resize'
        },
        values    : {
            left  : false,
            right : true
        },
        texts     : {
            left  : 'ON',
            right : 'OFF'
        },
        animates  : {
            duration : 'fast',
            easing   : 'swing'
        },
        change    : function(event, ui) {
        },
        flipstart : function(event, ui) {
        },
        flip      : function(event, ui) {
        },
        flipend   : function(event, ui) {
        }
    };

    // Settings
    $.fn.flipswitch.settings = {};

})(jQuery);
