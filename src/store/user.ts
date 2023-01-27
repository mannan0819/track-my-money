import { writable } from 'svelte/store';

interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

export const user = writable<User | undefined>(undefined);
