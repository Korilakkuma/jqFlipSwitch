QUnit.module('_changeChekced');

QUnit.test('should return boolean', function() {
    var div = $('<div />');

    div.append('<input />');

    var checkbox = div.children().attr('type', 'checkbox');

    strictEqual(checkbox[0].checked, false, 'checkbox[0]');

    _changeChecked(div);

    strictEqual(checkbox[0].checked, true, 'checkbox[0]');
});

QUnit.test('should return undefined', function() {
    strictEqual(_changeChecked(1),      undefined, '_changeClass(1)');
    strictEqual(_changeChecked('TEST'), undefined, '_changeClass("TEST")');
    strictEqual(_changeChecked(true),   undefined, '_changeClass(true)');
    strictEqual(_changeChecked(null),   undefined, '_changeClass(null)');
    strictEqual(_changeChecked(),       undefined, '_changeClass()');

    var a = [];

    strictEqual(_changeChecked(a), undefined, '_changeClass(a)');

    var f = function() {};

    strictEqual(_changeChecked(f), undefined, '_changeClass(f)');

    var c = new function C() {};

    strictEqual(_changeChecked(c), undefined, '_changeClass(c)');

    var div = document.createElement('div');

    strictEqual(_changeChecked(div), undefined, '_changeClass(div)');

    strictEqual(_changeChecked($(div)), undefined, '_changeClass($(div))');

    $(div).append('<input />');

    strictEqual(_changeChecked($(div)), undefined, '_changeClass($(div))');
});
