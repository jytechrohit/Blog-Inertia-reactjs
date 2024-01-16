import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/inertia-react";
import { router } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Inertia } from "@inertiajs/inertia";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Edit({ auth, categories }) {
    const { user } = auth;
    if (!user) {
        Inertia.visit(route("register"));
        return null;
    }
    const { data, setData, post } = useForm({
        user_id: "",
        category_id: "",
        name: "",
        slug: "",
        content: "",
        image: null,
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
        console.log(e.target);
        setData("image", e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);

        const formData = new FormData();
        formData.append("user_id", data.user_id);
        formData.append("category_id", data.category_id);
        formData.append("name", data.name);
        formData.append("slug", data.slug);
        formData.append("content", data.content);
        formData.append("image", data.image);

        // post(route("posts.store"), {
        //     data: formData,
        //     onSuccess: () => {
        //         router.push(route("posts.index"));
        //     },
        // });
        post(route("posts.store"), {
            data: formData,
            onSuccess: () => {
                toast.success("Post created successfully!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                    onClose: () => router.push(route("posts.index")),
                });
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create The Post
                </h2>
            }
        >
            <Head title={`Edit Post: ${post.id}`} />

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
                                        className={`mt-1 p-2 border border-gray-300 rounded-md w-full ${
                                            errors.user_id
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                    />

                                    {errors.user_id && (
                                        <div className="text-red-500">
                                            {errors.user_id}
                                        </div>
                                    )}
                                </div>
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
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className={`mt-1 p-2 border border-gray-300 rounded-md w-full ${
                                            errors.name ? "border-red-500" : ""
                                        }`}
                                    />
                                    {errors.name && (
                                        <div className="text-red-500">
                                            {errors.name}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="slug"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Slug
                                    </label>
                                    <input
                                        type="text"
                                        id="slug"
                                        name="slug"
                                        value={data.slug}
                                        onChange={(e) =>
                                            setData("slug", e.target.value)
                                        }
                                        className={`mt-1 p-2 border border-gray-300 rounded-md w-full ${
                                            errors.slug ? "border-red-500" : ""
                                        }`}
                                    />
                                    {errors.slug && (
                                        <div className="text-red-500">
                                            {errors.slug}
                                        </div>
                                    )}
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
                                        className={`mt-1 p-2 border border-gray-300 rounded-md w-full ${
                                            errors.image ? "border-red-500" : ""
                                        }`}
                                    />
                                    {errors.image && (
                                        <div className="text-red-500">
                                            {errors.image}
                                        </div>
                                    )}
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

// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Head, Link } from "@inertiajs/react";
// import React from "react";
// import { useForm } from "@inertiajs/inertia-react";
// import { router } from "@inertiajs/react";

// export default function Edit({ auth }) {
//     const { data, setData, post } = useForm({
//         user_id: "",
//         category_id: "",
//         title: "",
//         content: "",
//         image: null,
//     });

//     const handleFileChange = (e) => {
//         console.log(e.target);
//         setData("image", e.target.files[0]);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log(e);

//         const formData = new FormData();
//         formData.append("user_id", data.user_id);
//         formData.append("category_id", data.category_id);
//         formData.append("title", data.title);
//         formData.append("content", data.content);
//         formData.append("image", data.image);

//         post(route("posts.store"), {
//             data: formData,
//             onSuccess: () => {
//                 router.push(route("posts.index"));
//             },
//         });
//     };

//     return (
//         <AuthenticatedLayout
//             user={auth.user}
//             header={
//                 <h2 className="font-semibold text-xl text-gray-800 leading-tight">
//                     Create The Post
//                 </h2>
//             }
//         >
//             <Head title={`Edit Post: ${post.id}`} />

//             <div className="py-12">
//                 <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
//                     <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
//                         <div className="p-6 text-gray-900">
//                             <form
//                                 onSubmit={handleSubmit}
//                                 encType="multipart/form-data"
//                             >
//                                 <div className="mb-4">
//                                     <label
//                                         htmlFor="user_id"
//                                         className="block text-sm font-medium text-gray-700"
//                                     >
//                                         User id
//                                     </label>
//                                     <input
//                                         type="number"
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
//                                         htmlFor="category_id"
//                                         className="block text-sm font-medium text-gray-700"
//                                     >
//                                         category id
//                                     </label>
//                                     <input
//                                         type="number"
//                                         id="category_id"
//                                         name="category_id"
//                                         value={data.category_id}
//                                         onChange={(e) =>
//                                             setData(
//                                                 "category_id",
//                                                 e.target.value
//                                             )
//                                         }
//                                         className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label
//                                         htmlFor="title"
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
//                                         onChange={handleFileChange}
//                                         className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//                                     />
//                                 </div>
//                                 <div>
//                                     <button
//                                         type="submit"
//                                         className="bg-blue-500 text-white p-2 rounded-md"
//                                     >
//                                         Create Post
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
