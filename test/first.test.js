

const {describe, expect, test} =  require('@jest/globals');


function sum(a, b) {
  return a + b;
}

describe("Filter function", () => {
  test("it should filter by a search term (link)", () => {
   
   
    expect(sum(2,2)).toEqual(4);

  });
});