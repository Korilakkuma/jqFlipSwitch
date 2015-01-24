test('create()', function() {

    var div = $('<div />');

    deepEqual(div.flipswitch(),   div, 'div.flipswitch()');
    deepEqual(div.flipswitch({}), div, 'div.flipswitch()');

    deepEqual(div.flipswitch('create'),     div, 'div.flipswitch(\'create\')');
    deepEqual(div.flipswitch('create', {}), div, 'div.flipswitch(\'create\', {})');

});
