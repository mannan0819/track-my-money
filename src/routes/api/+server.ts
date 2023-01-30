import { connectDb } from "$lib/db/connect";
import mongoose from "mongoose";
import { json, type RequestHandler } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

export const POST = async (event: any) => {
    const req = await event.request.json();
    const email = req.email;
    const googleId = req.googleId;

    await connectDb();

    const schema = new mongoose.Schema({
        email: 'string',
        googleId: 'string'
    });
    const User = mongoose.model('User', schema);
    const newUser = new User({
        email,
        googleId
    });
    const results = newUser.save(function (err: any) {
        if (err) console.error(err);
        console.log('save');
    });
    return new Response(JSON.stringify({ results }), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}