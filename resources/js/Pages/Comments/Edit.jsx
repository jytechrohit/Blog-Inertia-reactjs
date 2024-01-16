// // PostEdit.jsx

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React from "react";
import { useForm } from "@inertiajs/inertia-react";
import { router } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function Edit({ auth }) {
    const { user } = auth;
    if (!user) {
        Inertia.visit(route("register"));
        return null;
    }
    const { data, setData, post, comment } = useForm({
        user_id: "",
        post_id: "",
        content: "",
        image: null,
    });

    const handleFileChange = (e) => {
        console.log(e.target);
        setData("image", e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        const formData = new FormData();
        formData.append("user_id", data.user_id);
        formData.append("post_id", data.post_id);
        formData.append("content", data.content);
        formData.append("slug", data.slug);
        formData.append("image", data.image);

        post(route("comment.store"), {
            data: formData,
            onSuccess: () => {
                router.push(route("comment.index"));
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create The Comment
                </h2>
            }
        >
            <Head title={"Create Comment"} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form
                                onSubmit={handleSubmit}
                                encType="multipart/form-data"
                            >
                                <div className="mb-4">
                                    <label
                                        htmlFor="user_id"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        User id
                                    </label>
                                    <input
                                        type="number"
                                        id="user_id"
                                        name="user_id"
                                        value={data.user_id}
                                        onChange={(e) =>
                                            setData("user_id", e.target.value)
                                        }
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="post_id"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Post id
                                    </label>
                                    <input
                                        type="number"
                                        id="post_id"
                                        name="post_id"
                                        value={data.post_id}
                                        onChange={(e) =>
                                            setData("post_id", e.target.value)
                                        }
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="content"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Content
                                    </label>
                                    <input
                                        type="text"
                                        id="content"
                                        name="content"
                                        value={data.content}
                                        onChange={(e) =>
                                            setData("content", e.target.value)
                                        }
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="image"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Image
                                    </label>
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        onChange={handleFileChange}
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    />
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white p-2 rounded-md"
                                    >
                                        Create Post
                                    </button>
                                    <Link
                                        href={route("postIndex")}
                                        className="ml-4 text-gray-500 hover:underline"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
