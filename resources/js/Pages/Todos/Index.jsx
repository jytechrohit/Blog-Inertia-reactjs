// TodoIndex.jsx
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function Index({ todos, auth }) {
    const { user } = auth;
    if (!user) {
        Inertia.visit(route("register"));
        return null;
    }
    // const { isAuthenticated } = usePage();

    // if (!isAuthenticated) {
    //     return (
    //         <div>
    //             <Link href={route("register")}>Register</Link>
    //         </div>
    //     );
    // }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Todo Index
                </h2>
            }
        >
            <Head title="TodoIndex" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-2xl mb-4">Todo</h2>
                            <div>
                                <Link
                                    href={route("todos.create")}
                                    className="ml-4 text-gray-500 hover:underline"
                                >
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white p-2 rounded-md"
                                    >
                                        Create Todo
                                    </button>
                                </Link>
                            </div>

                            <table className="table min-w-full">
                                <thead>
                                    <tr>
                                        <th scope="col">Sr no</th>
                                        <th scope="col">User Id</th>
                                        <th scope="col">Content</th>
                                        <th scope="col">Done or Not</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {todos.data.map((todo, index) => (
                                        <tr key={todo.id}>
                                            <td>
                                                {index +
                                                    1 +
                                                    (todos.current_page - 1) *
                                                        todos.per_page}
                                            </td>

                                            <td>{todo.user_id}</td>
                                            <td>{todo.content}</td>
                                            <td>{todo.is_done}</td>
                                            <td>
                                                <Link
                                                    href={route("todos.edit", {
                                                        id: todo.id,
                                                    })}
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    Edit
                                                </Link>
                                                {" | "}
                                                <Link
                                                    href={route(
                                                        "todos.destroy",
                                                        {
                                                            id: todo.id,
                                                        }
                                                    )}
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    Delete
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    {todos.links.map((link, index) => (
                                        <li
                                            key={index + 1}
                                            className={`page-item ${
                                                link.active ? "active" : ""
                                            }`}
                                            ƒ
                                        >
                                            <Link
                                                href={link.url}
                                                className="page-link"
                                            >
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
