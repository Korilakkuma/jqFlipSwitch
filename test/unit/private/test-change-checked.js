test('_changeChekced', function() {

    deepEqual(_changeChecked(1),      undefined, '_changeClass(1)');
    deepEqual(_changeChecked('TEST'), undefined, '_changeClass(\'TEST\')');
    deepEqual(_changeChecked(true),   undefined, '_changeClass(true)');
    deepEqual(_changeChecked(null),   undefined, '_changeClass(null)');
    deepEqual(_changeChecked(),       undefined, '_changeClass()');

    var a = [];

    deepEqual(_changeChecked(a), undefined, '_changeClass(a)');

    var f = function() {};

    deepEqual(_changeChecked(f), undefined, '_changeClass(f)');

    var c = new function C() {};

    deepEqual(_changeChecked(c), undefined, '_changeClass(c)');

    var div = document.createElement('div');

    deepEqual(_changeChecked(div), undefined, '_changeClass(div)');

    deepEqual(_changeChecked($(div)), undefined, '_changeClass($(div))');

    $(div).append('<input />');

    deepEqual(_changeChecked($(div)), undefined, '_changeClass($(div))');

    var checkbox = $(div).children().attr('type', 'checkbox');

    deepEqual(checkbox[0].checked, false, 'checkbox[0]');

    _changeChecked($(div));

    deepEqual(checkbox[0].checked, true, 'checkbox[0]');

});
