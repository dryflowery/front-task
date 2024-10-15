// writavle 읽기 전용을 쓸 수 있게 해줌
import { writable } from 'svelte/store'

export let storeName = writable('')