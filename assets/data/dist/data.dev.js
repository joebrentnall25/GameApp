"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hangman = void 0;
var hangman = {
  points: {
    0: {
      v: 10,
      c: 15
    },
    1: {
      v: 20,
      c: 30
    },
    2: {
      v: 40,
      c: 60
    }
  },
  alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
  vowels: ['a', 'e', 'i', 'o', 'u'],
  words: {
    easy: ['food', 'bed', 'hello', 'mister', 'friend', 'girl', 'mother', 'father', 'sister', 'brother', 'fire', 'water', 'earth', 'wind', 'lemon', 'orange', 'banana'],
    medium: ['tornado', 'earthquake', 'potato', 'distinct', 'problem'],
    hard: ['gizmo', 'matrix', 'twelfth', 'haiku', 'ivy', 'oxygen', 'xray']
  }
};
exports.hangman = hangman;