import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'

import User from "@models/User";
import { connnectToDB } from "@utils/database";

import removeDiacritics from "@components/translate";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks : {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })

            session.user.id = sessionUser._id.toString();

            return session;

        },
        async signIn({ profile }) {
            try {
                await connnectToDB();

                const userExists = await User.findOne({
                    email: profile.email
                });

                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: removeDiacritics(profile.name),
                        image: profile.picture
                    })
                }

                return true;

            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
})

export { handler as GET, handler as POST }