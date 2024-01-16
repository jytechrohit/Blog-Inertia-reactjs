import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React, { useState } from "react";
import { useForm } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

export default function Edit({ todo, auth }) {
    const { user } = auth;
    if (!user) {
        Inertia.visit(route("register"));
        return null;
    }
    const { data, setData, post } = useForm({
        user_id: todo.user_id,
        is_done: todo.is_done,
        content: todo.content,
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        //router.put(`/todo/${todo.id}`, values);
        post(route("todos.update", todo.id), {
            data,
            onSuccess: () => {
                router.push(route("todos.index"));
            },
        });
    }

    // const { data, setData, put } = useForm({
    //     user_id: todo.user_id,
    //     is_done: todo.is_done,
    //     content: todo.content,
    // });

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     put(route("todos.update", todo.id), {
    //         data,
    //         onSuccess: () => {
    //             router.push(route("todos.index"));
    //         },
    //     });
    // };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit The Todo
                </h2>
            }
        >
            <Head title={`Edit Todo: ${todo.id}`} />

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
                                        type="number" // Change to type="number"
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
                                        htmlFor="is_done"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        is_done
                                    </label>
                                    <input
                                        type="number" // Change to type="number"
                                        id="is_done"
                                        name="is_done"
                                        value={data.is_done}
                                        onChange={(e) =>
                                            setData("is_done", e.target.value)
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
