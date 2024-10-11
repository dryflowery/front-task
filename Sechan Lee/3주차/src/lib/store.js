import { writable } from 'svelte/store';

export const numArr = writable([29, 10, 14, 37, 14]); // 배열 크기는 [0, 10], 원소는 [0, 50]
export const animationWorking = writable(false);