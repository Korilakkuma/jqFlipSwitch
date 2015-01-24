test('MOUSE_EVENTS', function() {

    deepEqual(MOUSE_EVENTS.CLICK, 'click', 'MOUSE_EVENTS.CLICK');

    if (/iPhone|iPad|iPod|Android/.test(navigator.userAgent)) {
        deepEqual(MOUSE_EVENTS.START, 'touchstart', 'MOUSE_EVENTS.START');
        deepEqual(MOUSE_EVENTS.MOVE,  'touchmove',  'MOUSE_EVENTS.MOVE');
        deepEqual(MOUSE_EVENTS.END,   'touchend',   'MOUSE_EVENTS.END');
    } else {
        deepEqual(MOUSE_EVENTS.START, 'mousedown', 'MOUSE_EVENTS.START');
        deepEqual(MOUSE_EVENTS.MOVE,  'mousemove', 'MOUSE_EVENTS.MOVE');
        deepEqual(MOUSE_EVENTS.END,   'mouseup',   'MOUSE_EVENTS.END');
    }

});
