'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useParams } from "next/navigation"

import Profile from '@components/Profile'

const myProfile = () => {

    const router = useRouter()

    const params = useParams();

    const [myPosts, setMyPosts] = useState([]);

    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params.id}/posts`);
            const data = await response.json();

            setMyPosts(data);
        }

        const fetchUser = async () => {
            const response = await fetch(`/api/users/${params.id}`);
            const data = await response.json();

            setUser(data);
        }

        fetchPosts();
        fetchUser();
    }, [params.id])

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure?");

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: "DELETE",
                });

                const filteredPosts = myPosts.filter((p) => p._id !== post._id)

                setMyPosts(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    }

    console.log(myPosts);

    return (
        <Profile
            name={user.username}
            desc="Welcome to your personalized profile page"
            data={myPosts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default myProfile

