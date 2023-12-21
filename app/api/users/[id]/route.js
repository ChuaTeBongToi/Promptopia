import { connnectToDB } from "@utils/database";
import User from "@models/User";

export const GET = async (request, {params}) => {
    try {
        await connnectToDB();

        const res = await User.findById({
            _id: params.id
        })

        return new Response(JSON.stringify(res), { status: 200 })
    } catch (error) {
        return new Response("failed to fetch user information", { status: 500 })
    }
}