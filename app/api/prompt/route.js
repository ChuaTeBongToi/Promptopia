import { connnectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {
    try {
        await connnectToDB();

        const prompts = await Prompt.find().populate('creator');

        console.log(prompts)

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("failed to fetch all prompts", { status: 500 })
    }
}