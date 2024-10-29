import { writable } from 'svelte/store';

export const heap = writable([]); // 배열 크기는 [0, 32], 원소는 [0, 99]
export const tmpCreateHeap = writable([]);
export const elementCnt = writable(0);
export const extractCnt = writable(0);
export const deleteIdx = writable(0);

export const animationWorking = writable(false);
export const insertAnimationWorking = writable(false);
export const extractAnimationWorking = writable(false);
export const deletetAnimationWorking = writable(false);
export const createAnimationWorking = writable(false);
export const animationSpeed = writable(1);
export const isPaused = writable(false);

export const animationCnt = writable([0, 0]); // [curStep, maxStep]
export const codeColor = writable(Array(21).fill("rgba(255, 255, 255, 0)"));
export const naturalLang = writable("");

export const insertElement = writable(null);

export const isBegin = writable(false);
export const isEnd = writable(false);

export const randomColorArr = writable(["rgb(217, 81, 60)", "rgb(214, 87, 117)", "rgb(255, 138, 39)", 
                                        "rgb(254, 197, 21)", "rgb(75, 101, 186)", "rgb(46, 187, 209)", 
                                        "rgb(82, 188, 105)"]);
export const isUsedColor = writable(Array(7).fill(false));