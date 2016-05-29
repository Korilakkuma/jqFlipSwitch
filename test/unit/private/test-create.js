QUnit.module('_create');

QUnit.test('should return the instance of HTMLElement', function() {
    var input = document.createElement('input');

    input.setAttribute('type', 'checkbox');

    strictEqual(_create(input, {}), input.parentNode, '_create(input, {})');

    var div = document.createElement('div');

    strictEqual(_create(div, {}), div, '_create(div, {})');
});

QUnit.test('should return undefined', function() {
    strictEqual(_create(null),                        undefined, '_create(null)');
    strictEqual(_create(null, 1),                     undefined, '_create(null, 1)');
    strictEqual(_create(null, 'TEST'),                undefined, '_create(null, "TEST")');
    strictEqual(_create(null, null),                  undefined, '_create(null, null)');
    strictEqual(_create(null, []),                    undefined, '_create(null, [])');
    strictEqual(_create(null, function() {}),         undefined, '_create(null, function() {})');
    strictEqual(_create(null, new function TEST() {}, undefined, '_create(null, new function TEST() {}'));
});

QUnit.test('should return null', function() {
    var input = document.createElement('input');

    strictEqual(_create(null, {}), null,  '_create(null, {})');
    strictEqual(_create(input, {}), null, '_create(input, {})');
});
