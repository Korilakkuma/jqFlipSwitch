var div = null;

QUnit.module('create', {
    setup : function() {
        div = $('<div />');
    }
});

QUnit.test('should return the instance of jQuery', function() {
    deepEqual(div.flipswitch(),   div, 'div.flipswitch()');
    deepEqual(div.flipswitch({}), div, 'div.flipswitch()');

    deepEqual(div.flipswitch('create'),     div, 'div.flipswitch("create")');
    deepEqual(div.flipswitch('create', {}), div, 'div.flipswitch("create", {})');
});
