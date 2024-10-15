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
export const isEnd = writable(false);
export const randomColorArr = writable(["rgb(217, 81, 60)", "rgb(214, 87, 117)", "rgb(255, 138, 39)", 
                                        "rgb(254, 197, 21)", "rgb(75, 101, 186)", "rgb(46, 187, 209)", 
                                        "rgb(82, 188, 105)"]);
export const isUsedColor = writable(Array(7).fill(false));