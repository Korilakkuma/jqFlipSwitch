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
