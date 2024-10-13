import { writable } from 'svelte/store';

export const numArr = writable([29, 10, 14, 37, 14]); // 배열 크기는 [0, 20], 원소는 [0, 50]
export const elementCnt = writable(5);
export const animationWorking = writable(false);
export const codeColor = writable(Array(5).fill("rgba(255, 255, 255, 0)"));
export const naturalLang = writable("");
export const animationSpeed = writable(1);
export const isPaused = writable(false);
export const animationCnt = writable([0, 0]); // [curStep, maxStep]
export const isBegin = writable(false);