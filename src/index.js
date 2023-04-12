import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// import storeState from '.src/js/plantPower.js';
// import stateControl from './js/plantPower.js';
// import changeState from './js/plantPower.js';

// business logic

// This function stores our state.
const storeState = () => {
  let currentState = {};
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = { ...newState };
    return newState;
  };
};

const stateControl = storeState();

// This is a function factory. We can easily create more specific functions that alter a plant's soil, water, and light to varying degrees.
const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop]: (value)
    });
  };
};

const numberOfLineBreaks = (haikuInput) => {
  if (haikuInput.length === 0 || typeof haikuInput !== "string") {
    return 0;
  }
  const y = (haikuInput.match(/\n/g) || []).length;
  console.log(y);
  if(!y) {
    return 1;
  }
  return y + 1;
};

const lines = changeState("threeLines")('false');
const linesTrue = changeState("threeLines")('true');

function new_count(line) {
  const words = line.split(" ");
  let syllCount = 0;
  words.forEach(word => {
    word = word.toLowerCase();
    if (word.length <= 3) {
      syllCount += 1;
    } else {
      word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
      word = word.replace(/^y/, '');
      syllCount += word.match(/[aeiouy]{1,2}/g).length;
    }
  });
  return syllCount;
}

// UI logic

window.addEventListener("load", function () {

  let stateArr = [];

  // This function has side effects because we are manipulating the DOM. Manipulating the DOM will always be a side effect. Note that we only use one of our functions to alter soil. You can easily add more.

  document.getElementById('checkButton').onclick = function () {
    // let x = document.getElementById("userHaiku").value;
    // const newState = stateControl(lines);
    const currentState = stateControl();
    // y.innerHTML = numberOfLineBreaks(x);
    // stateArr.push(storeState()); 
    let y = document.createElement("p");
    y.innerHTML = `the Haiku has 3 lines: ${currentState.threeLines}`;
    document.querySelector('body').append(y);
  };

  document.getElementById('countButton').onclick = function () {
    let x = document.getElementById("userHaiku").value;
    let y = document.createElement("p");
    console.log(numberOfLineBreaks(x)); 
    if (numberOfLineBreaks(x) === 3) {
      const newState = stateControl(linesTrue);
      console.log(newState);
    } else if (numberOfLineBreaks(x) !== 3) {
      const newState = stateControl(lines);
    }
    console.log(x.split("\n"));
    const z = x.split('\n');
    if (new_count(z[0]) === 5) {
      console.log("this has 5 syllables.")
    }
    if (new_count(z[1]) === 7) {
      console.log("this has 7 syllables.")
    }
    if (new_count(z[2]) === 5) {
      console.log("this has 5 syllables.")
    }
    y.innerHTML = numberOfLineBreaks(x);
    // stateArr.push(storeState()); 
    document.querySelector('body').append(y);
  };

});