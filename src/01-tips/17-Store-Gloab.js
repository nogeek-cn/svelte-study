import { writable } from "svelte/store";

// 全局状态的管理
export const count = writable(100);