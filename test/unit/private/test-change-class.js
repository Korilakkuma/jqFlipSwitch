QUnit.module('_changeClass');

QUnit.test('should return boolean', function() {
    var div = $('<div />');

    _changeClass(div, FLIPPER_STATES.LEFT);

    strictEqual(div.hasClass(UI_CLASSES.FLIPPER_LEFT),  true,  '$(div).hasClass(UI_CLASSES.FLIPPER_LEFT)');
    strictEqual(div.hasClass(UI_CLASSES.FLIPPER_RIGHT), false, '$(div).hasClass(UI_CLASSES.FLIPPER_RIGHT)');

    _changeClass(div, FLIPPER_STATES.RIGHT);

    strictEqual(div.hasClass(UI_CLASSES.FLIPPER_LEFT),  false, '$(div).hasClass(UI_CLASSES.FLIPPER_LEFT)');
    strictEqual(div.hasClass(UI_CLASSES.FLIPPER_RIGHT), true,  '$(div).hasClass(UI_CLASSES.FLIPPER_RIGHT)');

    div.removeClass();

    _changeClass(div, 'center');

    strictEqual(div.hasClass(UI_CLASSES.FLIPPER_LEFT),  false, '$(div).hasClass(UI_CLASSES.FLIPPER_LEFT)');
    strictEqual(div.hasClass(UI_CLASSES.FLIPPER_RIGHT), false,  '$(div).hasClass(UI_CLASSES.FLIPPER_RIGHT)');
});

QUnit.test('should return undefined', function() {
    strictEqual(_changeClass(1),      undefined, '_changeClass(1)');
    strictEqual(_changeClass('TEST'), undefined, '_changeClass("TEST")');
    strictEqual(_changeClass(true),   undefined, '_changeClass(true)');
    strictEqual(_changeClass(null),   undefined, '_changeClass(null)');
    strictEqual(_changeClass(),       undefined, '_changeClass()');

    var a = [];

    strictEqual(_changeClass(a), undefined, '_changeClass(a)');

    var f = function() {};

    strictEqual(_changeClass(f), undefined, '_changeClass(f)');

    var c = new function C() {};

    strictEqual(_changeClass(c), undefined, '_changeClass(c)');

    var div = document.createElement('div');

    strictEqual(_changeClass(div), undefined, '_changeClass(div)');

    strictEqual(_changeClass($(div)), undefined, '_changeClass($(div))');
});
