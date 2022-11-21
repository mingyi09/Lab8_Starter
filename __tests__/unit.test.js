// unit.test.js

const functions = require('../code-to-unit-test/unit-test-me.js');

// TODO - Part 2

test('A real phone Number', () => {
    expect(functions.isPhoneNumber("858-555-5599")).toBe(true);
  });
test('Another real phone Number', () => {
    expect(functions.isPhoneNumber("888-666-9999")).toBe(true);
  });
test('Not a real phone Number', () => {
    expect(functions.isPhoneNumber("88")).toBe(false);
});
test('Not another real phone Number', () => {
    expect(functions.isPhoneNumber(8699)).toBe(false);
});

test('A real email', () => {
    expect(functions.isEmail("Word@mail.ru")).toBe(true);
  });
test('Another real email', () => {
    expect(functions.isEmail("Name@mail.ru")).toBe(true);
  });
test('Not a real email', () => {
    expect(functions.isEmail("aereara.ucsd.edu")).toBe(false);
});
test('Not another real email', () => {
    expect(functions.isEmail("@ucsd.edu")).toBe(false);
});

test('A real pswd', () => {
    expect(functions.isStrongPassword("Ra55it")).toBe(true);
  });
test('Another real pwsd', () => {
    expect(functions.isStrongPassword("L12da")).toBe(true);
  });
test('Not a real pswd', () => {
    expect(functions.isStrongPassword("_______")).toBe(false);
});
test('Not another real pwsd', () => {
    expect(functions.isStrongPassword("@edu")).toBe(false);
});

test('A real date', () => {
    expect(functions.isDate("01/2/2000")).toBe(true);
  });
test('Another real date', () => {
    expect(functions.isDate("11/11/2011")).toBe(true);
  });
test('Not a real date', () => {
    expect(functions.isDate("111/11/2000")).toBe(false);
});
test('Not another real date', () => {
    expect(functions.isDate("11/11/09")).toBe(false);
});

test('A real hex', () => {
    expect(functions.isHexColor("#1fd")).toBe(true);
  });
test('Another real hex', () => {
    expect(functions.isHexColor("#1f8300")).toBe(true);
  });
test('Not a real hex', () => {
    expect(functions.isHexColor("#1000")).toBe(false);
});
test('Not another real hex', () => {
    expect(functions.isHexColor("#10")).toBe(false);
});


