// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

import mongoose from 'mongoose';
import { env } from '$env/dynamic/public';
import type { PageServerLoad } from './sverdle/$types';

export const load = (async () => {
    const uri = `mongodb+srv://admin:${env.PUBLIC_MONGO_KEY}@cluster0.6oebhvt.mongodb.net/?retryWrites=true&w=majority`;
    // mongoose.disconnect();
    await mongoose.connect(uri)
    return {
        status: 200,
    };
}) satisfies PageServerLoad;
