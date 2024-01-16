import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function Index({ posts, auth }) {
    const { user } = auth;
    const page = usePage();
    if (!user) {
        Inertia.visit(route("register"));
        return null;
    }

    const confirmDelete = (commentId) => {
        if (window.confirm("Do you really want to delete this comment?")) {
            deleteComment(commentId);
        }
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Post Index
                </h2>
            }
        >
            <Head title="PostIndex" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-2xl mb-4">Posts</h2>
                            <div>
                                <Link
                                    href={route("posts.create")}
                                    className="ml-4 text-gray-500 hover:underline"
                                >
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white p-2 rounded-md"
                                    >
                                        Create Post
                                    </button>
                                </Link>
                            </div>
                            <table className="table min-w-full">
                                <thead>
                                    <tr className="border px-4 py-2 text-center align-middle">
                                        <th className="text-center">Sr no</th>
                                        <th className="text-center">User</th>
                                        <th className="test-center">
                                            Category
                                        </th>
                                        <th className="text-center">Image</th>
                                        <th className="text-center">Name</th>
                                        <th className="text-center">Content</th>
                                        <th className="text-center">Tags</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.data.map((post, index) => (
                                        <tr key={post.id}>
                                            <td className=" border px-4 text-center align-middle">
                                                {index +
                                                    1 +
                                                    (posts.current_page - 1) *
                                                        posts.per_page}
                                            </td>
                                            <td className="border px-4 py-2 text-center align-middle">
                                                {post.user.name}
                                            </td>
                                            <td className="border px-4 py-2 text-center align-middle">
                                                {post.categories.slug}
                                            </td>
                                            <td className="border px-4 py-2 text-center align-middle">
                                                <img
                                                    src={post.full_path}
                                                    width="1000px"
                                                />
                                            </td>
                                            <td className=" border px-4 py-2 text-center align-middle">
                                                {post.name}
                                            </td>
                                            <td className=" border px-4 py-2 text-center align-middle">
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: post.content,
                                                    }}
                                                />
                                            </td>
                                            <td className=" border px-4 py-2 text-center align-middle">
                                                {post.tags.map((tag, index) => (
                                                    <div key={tag.id}>
                                                        {tag.name}
                                                    </div>
                                                ))}
                                            </td>

                                            <td className="border px-4 py-2 text-center align-middle">
                                                <Link
                                                    href={route("posts.edit", {
                                                        id: post.id,
                                                    })}
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    Edit
                                                </Link>
                                                {" | "}
                                                <Link
                                                    href={route(
                                                        "posts.destroy",
                                                        {
                                                            id: post.id,
                                                        }
                                                    )}
                                                    onClick={() =>
                                                        confirmDelete(post.id)
                                                    }
                                                    className="text-red-500 hover:underline cursor-pointer"
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
                                    {posts.links.map((link, index) => (
                                        <li
                                            key={index + 1}
                                            className={`page-item ${
                                                link.active ? "active" : ""
                                            }`}
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
