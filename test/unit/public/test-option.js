test('option()', function() {

    var flipswitch = $('<div />').flipswitch();

    // Getter by Default
    (function() {
        deepEqual(flipswitch.flipswitch('option'),           undefined, 'flipswitch.flipswitch(\'option\')');
        deepEqual(flipswitch.flipswitch('option', 'width'),  200,       'flipswitch.flipswitch(\'option\', \'width\')');
        deepEqual(flipswitch.flipswitch('option', 'height'),  50,       'flipswitch.flipswitch(\'option\', \'height\')');
        deepEqual(flipswitch.flipswitch('option', 'init'),   'left',     'flipswitch.flipswitch(\'option\', \'init\')');

        var cursors = flipswitch.flipswitch('option', 'cursors');
        deepEqual(cursors.normal, 'pointer', 'cursors.normal');

        var values = flipswitch.flipswitch('option', 'values');
        deepEqual(values.left,  false, 'values.left');
        deepEqual(values.right, true,  'values.right');

        var texts = flipswitch.flipswitch('option', 'texts');
        deepEqual(texts.left,  'ON',  'texts.left');
        deepEqual(texts.right, 'OFF', 'texts.right');

        var animates = flipswitch.flipswitch('option', 'animates');
        deepEqual(animates.duration, 'fast',  'animates.duration');
        deepEqual(animates.easing,   'swing', 'animates.easing');

        ok(flipswitch.flipswitch('option', 'change') instanceof Function, 'flipswitch.flipswitch(\'option\', \'change\') instanceof Function');
    })();

    // Setter
    (function() {
        flipswitch.flipswitch('option', 'width', 400);
        deepEqual(flipswitch.flipswitch('option', 'width'), 400, 'flipswitch.flipswitch(\'option\', \'width\', 400)');

        flipswitch.flipswitch('option', 'height', 100);
        deepEqual(flipswitch.flipswitch('option', 'height'), 100, 'flipswitch.flipswitch(\'option\', \'height\', 100)');

        flipswitch.flipswitch('option', 'init', 'right');
        deepEqual(flipswitch.flipswitch('option', 'init'), 'right', 'flipswitch.flipswitch(\'option\', \'init\', \'right\')');

        flipswitch.flipswitch('option', 'cursors', {normal : 'move'});
        deepEqual(flipswitch.flipswitch('option', 'cursors').normal, 'move', 'flipswitch.flipswitch(\'option\', \'cursors\', {normal : \'move\'})');

        flipswitch.flipswitch('option', 'values', {left : true, right : false});
        deepEqual(flipswitch.flipswitch('option', 'values').left,  true,  'flipswitch.flipswitch(\'option\', \'values\', {left : true, right : false})');
        deepEqual(flipswitch.flipswitch('option', 'values').right, false, 'flipswitch.flipswitch(\'option\', \'values\', {left : true, right : false})');

        flipswitch.flipswitch('option', 'texts', {left : 'YES', right : 'NO'});
        deepEqual(flipswitch.flipswitch('option', 'texts').left,  'YES', 'flipswitch.flipswitch(\'option\', \'texts\', {left : \'YES\', right : \'NO\'})');
        deepEqual(flipswitch.flipswitch('option', 'texts').right, 'NO',  'flipswitch.flipswitch(\'option\', \'texts\', {left : \'YES\', right : \'NO\'})');

        flipswitch.flipswitch('option', 'animates', {duration : 'slow', easing : 'linear'});
        deepEqual(flipswitch.flipswitch('option', 'animates').duration, 'slow',   'flipswitch.flipswitch(\'option\', \'animates\', {duration : \'slow\', easing : \'linear\'})');
        deepEqual(flipswitch.flipswitch('option', 'animates').easing,   'linear', 'flipswitch.flipswitch(\'option\', \'animates\', {duration : \'slow\', easing : \'linear\'})');

        var change = function change(event, ui) {};
        flipswitch.flipswitch('option', 'change', change);
        deepEqual(flipswitch.flipswitch('option', 'change'), change, 'flipswitch.flipswitch(\'option\', \'change\', function change(event, ui) {})');
    })();

});
