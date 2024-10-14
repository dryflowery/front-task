import { writable } from 'svelte/store';

export const animationWorking = writable(false);

export const numArray = writable([50,15,5,20,40,35,30,45,10,25]); // 기본 요소

export const codeColor = writable(Array(5).fill("rgba(255, 255, 255, 0)"));

export const naturalExplanation = writable("");

export const animationSpeed = writable(1.0);

export const isPaused = writable(false);