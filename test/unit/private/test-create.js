test('_create()', function() {

    deepEqual(_create(null),                        undefined, '_create(null)');
    deepEqual(_create(null, 1),                     undefined, '_create(null, 1)');
    deepEqual(_create(null, 'TEST'),                undefined, '_create(null, \'TEST\')');
    deepEqual(_create(null, null),                  undefined, '_create(null, null)');
    deepEqual(_create(null, []),                    undefined, '_create(null, [])');
    deepEqual(_create(null, function() {}),         undefined, '_create(null, function() {})');
    deepEqual(_create(null, new function TEST() {}, undefined, '_create(null, new function TEST() {}'));

    var input = document.createElement('input');

    deepEqual(_create(null, {}), null,  '_create(null, {})');
    deepEqual(_create(input, {}), null, '_create(input, {})');

    input.setAttribute('type', 'checkbox');

    deepEqual(_create(input, {}), input.parentNode, '_create(input, {})');

    var div = document.createElement('div');

    deepEqual(_create(div, {}), div, '_create(div, {})');

});
