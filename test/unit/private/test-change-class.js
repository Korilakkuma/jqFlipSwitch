test('_changeClass()', function() {

    deepEqual(_changeClass(1),      undefined, '_changeClass(1)');
    deepEqual(_changeClass('TEST'), undefined, '_changeClass(\'TEST\')');
    deepEqual(_changeClass(true),   undefined, '_changeClass(true)');
    deepEqual(_changeClass(null),   undefined, '_changeClass(null)');
    deepEqual(_changeClass(),       undefined, '_changeClass()');

    var a = [];

    deepEqual(_changeClass(a), undefined, '_changeClass(a)');

    var f = function() {};

    deepEqual(_changeClass(f), undefined, '_changeClass(f)');

    var c = new function C() {};

    deepEqual(_changeClass(c), undefined, '_changeClass(c)');

    var div = document.createElement('div');

    deepEqual(_changeClass(div), undefined, '_changeClass(div)');

    deepEqual(_changeClass($(div)), undefined, '_changeClass($(div))');

    _changeClass($(div), FLIPPER_STATES.LEFT);

    deepEqual($(div).hasClass(UI_CLASSES.FLIPPER_LEFT),  true,  '$(div).hasClass(UI_CLASSES.FLIPPER_LEFT)');
    deepEqual($(div).hasClass(UI_CLASSES.FLIPPER_RIGHT), false, '$(div).hasClass(UI_CLASSES.FLIPPER_RIGHT)');

    _changeClass($(div), FLIPPER_STATES.RIGHT);

    deepEqual($(div).hasClass(UI_CLASSES.FLIPPER_LEFT),  false, '$(div).hasClass(UI_CLASSES.FLIPPER_LEFT)');
    deepEqual($(div).hasClass(UI_CLASSES.FLIPPER_RIGHT), true,  '$(div).hasClass(UI_CLASSES.FLIPPER_RIGHT)');

    $(div).removeClass();

    _changeClass($(div), 'center');

    deepEqual($(div).hasClass(UI_CLASSES.FLIPPER_LEFT),  false, '$(div).hasClass(UI_CLASSES.FLIPPER_LEFT)');
    deepEqual($(div).hasClass(UI_CLASSES.FLIPPER_RIGHT), false,  '$(div).hasClass(UI_CLASSES.FLIPPER_RIGHT)');

});
