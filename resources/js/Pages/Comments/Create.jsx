// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/inertia-react";
import { router } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";

export default function Create({ auth, postData }) {
    const { user } = auth;
    if (!user) {
        Inertia.visit(route("register"));
        return null;
    }
    const { data, setData, post, comment } = useForm({
        user_id: auth.user.id,
        post_id: postData.id,
        content: "",
        image: null,
    });
    //console.log(postData);
    const { errors } = usePage().props;

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
        formData.append("image", data.image);

        post(route("comment.store"), {
            data: formData,
            onSuccess: () => {
                router.push(route("comment.index"));
            },
        });
    };

    return (
        // <Authenticated
        //     user={auth.user}
        //     // header={
        //     //     <h2 className="font-semibold text-xl text-gray-800 leading-tight">
        //     //         Create The Comment
        //     //     </h2>
        //     // }
        // >
        <>
            {/* <Head title={"Create Comment"} /> */}

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form
                                onSubmit={handleSubmit}
                                encType="multipart/form-data"
                            >
                                <input
                                    type="hidden"
                                    // value={postData.id}
                                    value={data.post_id}
                                    name="post_id"
                                />
                                <input
                                    type="hidden"
                                    value={data.user_id}
                                    name="user_id"
                                />

                                <div className="mb-4">
                                    <label
                                        htmlFor="content"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Content
                                    </label>
                                    <ReactQuill
                                        theme="snow"
                                        value={data.content}
                                        onChange={(
                                            content,
                                            delta,
                                            source,
                                            editor
                                        ) => {
                                            setData("content", content);
                                        }}
                                        className={`mt-1 p-2 border border-gray-300 rounded-md w-full ${
                                            errors.content
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                    />
                                    {errors.content && (
                                        <div className="text-red-500">
                                            {errors.content}
                                        </div>
                                    )}
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
        </>
        //</Authenticated>
    );
}
