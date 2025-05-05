import {Offers} from './types/offers.ts';

export function getRandomInteger(a: number, b: number){
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

export function getRandomArrayElement(arrays: Offers) {
  return arrays[getRandomInteger(0, arrays.length - 1)];
}
