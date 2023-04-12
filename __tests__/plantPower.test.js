/* eslint-disable no-undef */
// import storeState from "../src/index.js";
// import stateControl from "../src/index.js";
// import storeState from "../src/index.js";
// import storeState from "../src/index.js";

// beforeEach(() => {
//   inputAge = new GalacticAge(35);
// });

const storeState = () => {
  let currentState = {};
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = { ...newState };
    return newState;
  };
};

const stateControl = storeState();

test("should return the inner stateChangeFunction stored inside of storeState", () => {
  expect(stateControl).toEqual((stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = { ...newState };
    return newState;
  });
});

// test('should correctly calculate the number of years which have past on Jupiter since a given age value', () => {
//   expect(inputAge.yearsSinceJupiter(25)).toEqual(.84);
// });

// test('should correctly calculate the number of years which have yet to pass on Jupiter until a given age value', () => {
//   expect(inputAge.yearsYetToPassOnJupiter(46)).toEqual(.93);
// })
