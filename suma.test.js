const add = (a, b) => {
   return a + b;
}

// const jest = require('jest')

test('Should be 4', () => {
   expect(add(2, 2)).toBe(4)
});