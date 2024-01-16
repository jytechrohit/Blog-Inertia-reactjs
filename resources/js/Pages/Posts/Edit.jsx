import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/inertia-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Inertia } from "@inertiajs/inertia";

export default function Edit({ post, auth, categories }) {
    const { user } = auth;
    // const page = usePage();
    if (!user) {
        Inertia.visit(route("register"));
        return null;
    }
    const { data, setData, put } = useForm({
        user_id: post.user_id,
        category_id: post.category_id,
        name: post.name,
        slug: post.slug,
        content: post.content,
        image: post.image,
    });

    const { errors } = usePage().props;
    const [categoryOptions, setCategoryOptions] = useState([]);
    useEffect(() => {
        setCategoryOptions(
            categories.map((category) => ({
                label: category.slug,
                value: category.id,
            }))
        );
    }, [categories]);

    const handleFileChange = (e) => {
        console.log(e.target.files[0]);
        setData("image", e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        router.post(route("posts.update", post.id), {
            _method: "put",
            image: data.image,
            user_id: data.user_id,
            category_id: data.category_id,
            name: data.name,
            slug: data.slug,
            content: data.content,
        });
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit The Post
                </h2>
            }
        >
            <Head title={`Edit Todo: ${post.id}`} />

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
                                    value={data.user_id}
                                    name="user_id"
                                />

                                <div className="mb-4">
                                    <label
                                        htmlFor="category_id"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Category
                                    </label>
                                    <select
                                        id="category_id"
                                        name="category_id"
                                        value={data.category_id}
                                        onChange={(e) =>
                                            setData(
                                                "category_id",
                                                e.target.value
                                            )
                                        }
                                        className={`mt-1 p-2 border border-gray-300 rounded-md w-full ${
                                            errors.category_id
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                    >
                                        {errors.category_id && (
                                            <div className="text-red-500">
                                                {errors.category_id}
                                            </div>
                                        )}

                                        {categoryOptions.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="slug"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        slug
                                    </label>
                                    <input
                                        type="text"
                                        id="slug"
                                        name="slug"
                                        value={data.slug}
                                        onChange={(e) =>
                                            setData("slug", e.target.value)
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
                                        Update Todo
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Head, Link } from "@inertiajs/react";
// import React, { useState } from "react";
// import { useForm } from "@inertiajs/inertia-react";

// export default function Edit({ post, auth }) {
//     const { data, setData, put } = useForm({
//         user_id: post.user_id,
//         title: post.title,
//         content: post.content,
//         image: post.image,
//     });

//     function handleSubmit(e) {
//         e.preventDefault();
//         put(route("posts.update", post.id), {
//             data,
//             onSuccess: () => {
//                 router.push(route("posts.index"));
//             },
//         });
//     }

//     return (
//         <AuthenticatedLayout
//             user={auth.user}
//             header={
//                 <h2 className="font-semibold text-xl text-gray-800 leading-tight">
//                     Edit The Post
//                 </h2>
//             }
//         >
//             <Head title={`Edit Post: ${post.id}`} />

//             <div className="py-12">
//                 <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
//                     <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
//                         <div className="p-6 text-gray-900">
//                             <form onSubmit={handleSubmit}>
//                                 <div className="mb-4">
//                                     <label
//                                         htmlFor="user_id"
//                                         className="block text-sm font-medium text-gray-700"
//                                     >
//                                         User id
//                                     </label>
//                                     <input
//                                         type="number" // Change to type="number"
//                                         id="user_id"
//                                         name="user_id"
//                                         value={data.user_id}
//                                         onChange={(e) =>
//                                             setData("user_id", e.target.value)
//                                         }
//                                         className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label
//                                         htmlFor="is_done"
//                                         className="block text-sm font-medium text-gray-700"
//                                     >
//                                         title
//                                     </label>
//                                     <input
//                                         type="text"
//                                         id="title"
//                                         name="title"
//                                         value={data.title}
//                                         onChange={(e) =>
//                                             setData("title", e.target.value)
//                                         }
//                                         className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label
//                                         htmlFor="content"
//                                         className="block text-sm font-medium text-gray-700"
//                                     >
//                                         Content
//                                     </label>
//                                     <input
//                                         type="text"
//                                         id="content"
//                                         name="content"
//                                         value={data.content}
//                                         onChange={(e) =>
//                                             setData("content", e.target.value)
//                                         }
//                                         className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label
//                                         htmlFor="image"
//                                         className="block text-sm font-medium text-gray-700"
//                                     >
//                                         Image
//                                     </label>
//                                     <input
//                                         type="file"
//                                         id="image"
//                                         name="image"
//                                         value={data.image}
//                                         onChange={(e) =>
//                                             setData("image", e.target.value)
//                                         }
//                                         className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//                                     />
//                                 </div>
//                                 <div>
//                                     <button
//                                         type="submit"
//                                         className="bg-blue-500 text-white p-2 rounded-md"
//                                     >
//                                         Update Post
//                                     </button>
//                                     <Link
//                                         href={route("postIndex")}
//                                         className="ml-4 text-gray-500 hover:underline"
//                                     >
//                                         Cancel
//                                     </Link>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }
