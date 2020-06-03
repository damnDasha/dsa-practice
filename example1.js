// The naive solution

// A simple solution would be to compare every value with every other value.
// The value which is not less than any of the other values will be the maximum.
//  For example:

function max(array) {
  for (const itemA of array) {
    // Assume that it is the maximum value until we know otherwise
    let isMax = true;

    for (const itemB of array) {
      if (itemA < itemB) {
        /* There is a value greater than itemA, so it is not the
                   maximum */
        isMax = false;
      }
    }

    if (isMax) {
      return itemA;
    }
  }
}

// Because you compare every value with every other value it will have an
// O(n^2) worst and average-case time complexity.
// The best case is that the 1st value is the maximum, making it O(n).

// So, how could this be improved?
// Well, a simple improvement would be to stop checking the values
// when you know it is not the maximum value:

function max(array) {
  for (const itemA of array) {
    // Assume that it is the maximum value until we know otherwise
    let isMax = true;

    for (const itemB of array) {
      if (itemA < itemB) {
        /* There is a value greater than itemA, so it is not the
                   maximum */
        isMax = false;
        // Don't keep checking the value
        break;
      }
    }

    if (isMax) {
      return itemA;
    }
  }
}
// This will have the same complexity but will
// bring the running time coefficient down a bit.

// A better solution

// The trick here is keeping track of the current maximum value
// as you work your way through the array,
// and change it if you come across a greater value:

function max(array) {
  if (array.length === 0) {
    return null;
  }

  let currentMax = array[0];
  for (let i = 1; i < array.length; i++) {
    const item = array[i];
    if (item > currentMax) {
      currentMax = item;
    }
  }
  return currentMax;
}

// You are given a sentence and have to find the most commonly occurring
// character.

// The naive solution

// A 1st attempt at a solution might be to take each possible character
// in the alphabet, and use a variant of your max algorithm
// to find which occurs most often:

function mostCommon(s) {
  if (s.length === 0) {
    return null;
  }

  s = s.toLowerCase();

  let maxOccurrences = 0;
  let mostCommonCharacter = null;
  for (let i = 0; i < 26; i++) {
    // Convert number to an a-z character
    const character = String.fromCharCode(97 + i);

    let count = 0;
    for (let j = 0; j < s.length; j++) {
      if (s.charAt(j) == character) {
        count++;
      }
    }

    if (count > maxOccurrences) {
      mostCommonCharacter = character;
      maxOccurrences = count;
    }
  }
  return mostCommonCharacter;
}
// This is O(n) in the best, worst and average case,
// with a pretty high coefficient because you loop through the entire array
// 1 time for each letter.

// If your strings are unlikely to contain every letter then there
// is likely to be an optimization by initially making a set of the letters
// in the sentence, then searching through each of them,
// trading off time complexity for the additional memory
// used to store the set of letters.

// A better solution

// To optimize this further you can introduce a JavaScript object.
// This will store a key-value pair where the key is the character,
// and the value is the number of times the character occurs.
// Then you can use the same max variant to find the character which occurs most often:

function mostCommon(s) {
  if (s.length === 0) {
    return null;
  }

  s = s.toLowerCase();

  const characters = {};
  for (let i = 0; i < s.length; i++) {
    var character = s.charAt(i);
    const characterCode = s.charCodeAt(i);
    if (characterCode < 97 || characterCode > 122) {
      // Filter non a-z characters
      continue;
    }

    if (!(character in characters)) {
      characters[character] = 1;
    } else {
      characters[character]++;
    }
  }

  let mostCommonCharacter = null;
  let maxOccurrences = 0;
  for (let character in characters) {
    const count = characters[character];

    if (count > maxOccurrences) {
      mostCommonCharacter = character;
      maxOccurrences = count;
    }
  }
  return mostCommonCharacter;
}
// This is still O(n),
// but you only need to loop through the string 1 time and the hash map 1 time;
// far fewer than the 26 times from the naive solution.
