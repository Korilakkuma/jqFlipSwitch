var flipswitch = null;

QUnit.module('option', {
    setup : function() {
        flipswitch = $('<div />').flipswitch();
    }
});

QUnit.test('should return initial value', function() {
    strictEqual(flipswitch.flipswitch('option'),           undefined, 'flipswitch.flipswitch("option")');
    strictEqual(flipswitch.flipswitch('option', 'width'),  200,       'flipswitch.flipswitch("option", "width")');
    strictEqual(flipswitch.flipswitch('option', 'height'), 50,        'flipswitch.flipswitch("option", "height")');
    strictEqual(flipswitch.flipswitch('option', 'init'),   'left',    'flipswitch.flipswitch("option", "init")');

    var cursors = flipswitch.flipswitch('option', 'cursors');
    strictEqual(cursors.normal, 'pointer',   'cursors.normal');
    strictEqual(cursors.flip,   'ew-resize', 'cursors.flip');

    var values = flipswitch.flipswitch('option', 'values');
    strictEqual(values.left,  false, 'values.left');
    strictEqual(values.right, true,  'values.right');

    var texts = flipswitch.flipswitch('option', 'texts');
    strictEqual(texts.left,  'ON',  'texts.left');
    strictEqual(texts.right, 'OFF', 'texts.right');

    var animates = flipswitch.flipswitch('option', 'animates');
    strictEqual(animates.duration, 'fast',  'animates.duration');
    strictEqual(animates.easing,   'swing', 'animates.easing');

    ok(flipswitch.flipswitch('option', 'change') instanceof Function,    'flipswitch.flipswitch("option", "change") instanceof Function');
    ok(flipswitch.flipswitch('option', 'flipstart') instanceof Function, 'flipswitch.flipswitch("option", "flipstart") instanceof Function');
    ok(flipswitch.flipswitch('option', 'flip') instanceof Function,      'flipswitch.flipswitch("option", "flip") instanceof Function');
    ok(flipswitch.flipswitch('option', 'flipend') instanceof Function,   'flipswitch.flipswitch("option", "flipend") instanceof Function');
});

QUnit.test('should return the designated value', function() {
    flipswitch.flipswitch('option', 'width', 400);
    strictEqual(flipswitch.flipswitch('option', 'width'), 400, 'flipswitch.flipswitch("option", "width", 400)');

    flipswitch.flipswitch('option', 'height', 100);
    strictEqual(flipswitch.flipswitch('option', 'height'), 100, 'flipswitch.flipswitch("option", "height", 100)');

    flipswitch.flipswitch('option', 'init', 'right');
    strictEqual(flipswitch.flipswitch('option', 'init'), 'right', 'flipswitch.flipswitch("option", "init", "right")');

    flipswitch.flipswitch('option', 'cursors', {normal : 'move', flip : 'crosshair'});
    strictEqual(flipswitch.flipswitch('option', 'cursors').normal, 'move',      'flipswitch.flipswitch("option", "cursors", {normal : "move", flip : "crosshair"})');
    strictEqual(flipswitch.flipswitch('option', 'cursors').flip,   'crosshair', 'flipswitch.flipswitch("option", "cursors", {normal : "move", flip : "crosshair"})');

    flipswitch.flipswitch('option', 'values', {left : true, right : false});
    strictEqual(flipswitch.flipswitch('option', 'values').left,  true,  'flipswitch.flipswitch("option", "values", {left : true, right : false})');
    strictEqual(flipswitch.flipswitch('option', 'values').right, false, 'flipswitch.flipswitch("option", "values", {left : true, right : false})');

    flipswitch.flipswitch('option', 'texts', {left : 'YES', right : 'NO'});
    strictEqual(flipswitch.flipswitch('option', 'texts').left,  'YES', 'flipswitch.flipswitch("option", "texts", {left : "YES", right : "NO"})');
    strictEqual(flipswitch.flipswitch('option', 'texts').right, 'NO',  'flipswitch.flipswitch("option", "texts", {left : "YES", right : "NO"})');

    flipswitch.flipswitch('option', 'animates', {duration : 'slow', easing : 'linear'});
    strictEqual(flipswitch.flipswitch('option', 'animates').duration, 'slow',   'flipswitch.flipswitch("option", "animates", {duration : "slow", easing : "linear"})');
    strictEqual(flipswitch.flipswitch('option', 'animates').easing,   'linear', 'flipswitch.flipswitch("option", "animates", {duration : "slow", easing : "linear"})');

    var change = function(event, ui) {};
    flipswitch.flipswitch('option', 'change', change);
    strictEqual(flipswitch.flipswitch('option', 'change'), change, 'flipswitch.flipswitch("option", "change", function change(event, ui) {})');

    var flipstart = function(event, ui) {};
    flipswitch.flipswitch('option', 'flipstart', flipstart);
    strictEqual(flipswitch.flipswitch('option', 'flipstart'), flipstart, 'flipswitch.flipswitch("option", "flipstart", function flipstart(event, ui) {})');

    var flip = function(event, ui) {};
    flipswitch.flipswitch('option', 'flip', flip);
    strictEqual(flipswitch.flipswitch('option', 'flip'), flip, 'flipswitch.flipswitch("option", "flip", function flip(event, ui) {})');

    var flipend = function(event, ui) {};
    flipswitch.flipswitch('option', 'flipend', flipend);
    strictEqual(flipswitch.flipswitch('option', 'flipend'), flipend, 'flipswitch.flipswitch("option", "flipend", function flipend(event, ui) {})');
});
