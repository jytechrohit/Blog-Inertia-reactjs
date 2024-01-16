import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useForm } from "@inertiajs/inertia-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Inertia } from "@inertiajs/inertia";

export default function Create({ auth }) {
    const { user } = auth;
    if (!user) {
        Inertia.visit(route("register"));
        return null;
    }
    const { data, setData, post } = useForm({
        user_id: "",
        is_done: "",
        content: "",
    });
    const { errors } = usePage().props;

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("todos.store"), {
            data,
            onSuccess: () => {
                router.push(route("todos.index"));
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Todo
                </h2>
            }
        >
            <Head title="Create New Post" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label
                                        htmlFor="user_id"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        User id
                                    </label>
                                    <input
                                        type="integer"
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
                                        htmlFor="is_done"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        is_done
                                    </label>
                                    <input
                                        type="integer"
                                        id="is_done"
                                        name="is_done"
                                        value={data.is_done}
                                        onChange={(e) =>
                                            setData("is_done", e.target.value)
                                        }
                                        className={`mt-1 p-2 border border-gray-300 rounded-md w-full ${
                                            errors.is_done
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                    />
                                    {errors.is_done && (
                                        <div className="text-red-500">
                                            {errors.is_done}
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

                                <div>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white p-2 rounded-md"
                                    >
                                        Create Post
                                    </button>
                                    <Link
                                        href={route("todo")}
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
