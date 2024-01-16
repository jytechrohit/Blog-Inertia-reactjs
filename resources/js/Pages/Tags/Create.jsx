import { Head, Link, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/inertia-react";
import { router } from "@inertiajs/react";
import "react-quill/dist/quill.snow.css";
import { Inertia } from "@inertiajs/inertia";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

export default function CreateTags({ auth, tags, posts }) {
    const { user } = auth;
    if (!user) {
        Inertia.visit(route("register"));
        return null;
    }

    const { data, setData, post } = useForm({
        post_id: posts,
        tag_id: [], // Change to an array
    });

    const { errors } = usePage().props;

    const [postOptions, setPostOptions] = useState([]);
    const [tagOptions, setTagOptions] = useState([]);
    const [selectedTagOptions, setSelectedTagOptions] = useState([]);

    // useEffect(() => {
    //     setTagOptions(
    //         tags.map((tag) => ({
    //             label: tag.name,
    //             value: tag.id,
    //         }))
    //     );
    // }, [tags]);
    useEffect(() => {
        setTagOptions(
            tags
                .filter(
                    (tag) =>
                        !selectedTagOptions.some(
                            (selectedTag) => selectedTag.value === tag.id
                        )
                )
                .map((tag) => ({
                    label: tag.name,
                    value: tag.id,
                }))
        );
    }, [tags, selectedTagOptions]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("post_id", posts);

        // Use a Set to ensure unique values
        const uniqueTagIds = [...new Set(data.tag_id)];

        uniqueTagIds.forEach((tagId) => {
            formData.append("tag_id[]", tagId);
        });

        post(route("tags.store"), {
            data: formData,
            onSuccess: () => {
                router.push(route("tags.index"));
            },
        });
    };

    return (
        <>
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
                                    value={posts}
                                    name="post_id"
                                />
                                <div className="mb-4">
                                    <label
                                        htmlFor="tag_id"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Tag
                                    </label>
                                    <Select
                                        isMulti
                                        options={tagOptions}
                                        value={selectedTagOptions}
                                        onChange={(selectedOptions) => {
                                            setSelectedTagOptions(
                                                selectedOptions
                                            );
                                            const selectedValues =
                                                selectedOptions.map(
                                                    (option) => option.value
                                                );
                                            setData("tag_id", selectedValues);
                                        }}
                                    />
                                    {errors.tag_id && (
                                        <div className="text-red-500">
                                            {errors.tag_id}
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
        </>
    );
}

// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Head, Link, usePage } from "@inertiajs/react";
// import React, { useEffect, useState } from "react";
// import { useForm } from "@inertiajs/inertia-react";
// import { router } from "@inertiajs/react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { Inertia } from "@inertiajs/inertia";

// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import Select from "react-select";

// export default function Create({ auth, tags, posts }) {
//     const { user } = auth;
//     if (!user) {
//         Inertia.visit(route("register"));
//         return null;
//     }

//     const { data, setData, post } = useForm({
//         user_id: "",
//         tag_id: [], // Change to an array
//     });

//     const { errors } = usePage().props;

//     const [postOptions, setPostOptions] = useState([]);
//     const [tagOptions, setTagOptions] = useState([]);

//     // useEffect(() => {
//     //     setPostOptions(
//     //         posts.map((post) => ({
//     //             label: post.title,
//     //             value: post.id,
//     //         }))
//     //     );
//     //     setTagOptions(
//     //         tags.map((tag) => ({
//     //             label: tag.name,
//     //             value: tag.id,
//     //         }))
//     //     );
//     // }, [posts, tags]);
//     useEffect(() => {
//         setPostOptions(
//             posts.map((post) => ({
//                 label: post.title,
//                 value: post.id,
//             }))
//         );
//         setTagOptions(
//             tags.map((tag) => ({
//                 label: tag.name,
//                 value: tag.id,
//             }))
//         );
//     }, [posts, tags]);

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append("user_id", data.user_id);

//         data.tag_id.forEach((tagId) => {
//             formData.append("tag_id[]", tagId);
//         });

//         post(route("tags.store"), {
//             data: formData,
//             onSuccess: () => {
//                 router.push(route("tags.index"));
//             },
//         });
//     };

//     return (
//         <AuthenticatedLayout
//             user={auth.user}
//             header={
//                 <h2 className="font-semibold text-xl text-gray-800 leading-tight">
//                     Create The Tags
//                 </h2>
//             }
//         >
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
//                                         htmlFor="post_id"
//                                         className="block text-sm font-medium text-gray-700"
//                                     >
//                                         Post
//                                     </label>
//                                     <select
//                                         id="post_id"
//                                         name="post_id"
//                                         value={data.post_id}
//                                         onChange={(e) =>
//                                             setData("post_id", e.target.value)
//                                         }
//                                         className={`mt-1 p-2 border border-gray-300 rounded-md w-full ${
//                                             errors.post_id
//                                                 ? "border-red-500"
//                                                 : ""
//                                         }`}
//                                     >
//                                         {errors.post_id && (
//                                             <div className="text-red-500">
//                                                 {errors.post_id}
//                                             </div>
//                                         )}

//                                         {postOptions.map((option) => (
//                                             <option
//                                                 key={option.value}
//                                                 value={option.value}
//                                             >
//                                                 {option.label}
//                                             </option>
//                                         ))}
//                                     </select>

//                                     {errors.post_id && (
//                                         <div className="text-red-500">
//                                             {errors.post_id}
//                                         </div>
//                                     )}
//                                 </div>

//                                 <div className="mb-4">
//                                     <label
//                                         htmlFor="tag_id"
//                                         className="block text-sm font-medium text-gray-700"
//                                     >
//                                         Tag
//                                     </label>
//                                     <Select
//                                         isMulti
//                                         options={tagOptions}
//                                         value={tagOptions.filter((option) =>
//                                             data.tag_id.includes(option.value)
//                                         )}
//                                         onChange={(selectedOptions) => {
//                                             const selectedValues =
//                                                 selectedOptions.map(
//                                                     (option) => option.value
//                                                 );
//                                             setData("tag_id", selectedValues);
//                                         }}
//                                     />
//                                     {errors.tag_id && (
//                                         <div className="text-red-500">
//                                             {errors.tag_id}
//                                         </div>
//                                     )}
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
