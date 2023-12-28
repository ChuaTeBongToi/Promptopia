import { connnectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import mongoose from "mongoose";

export const GET = async (request) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
        });

        const prompts = await Prompt.find({}).populate('creator');

        console.log('Fetched all prompts');

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("failed to fetch all prompts", { status: 500 })
    }
}