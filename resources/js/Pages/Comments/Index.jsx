import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function Index({ comments, auth }) {
    const { user } = auth;
    if (!user) {
        Inertia.visit(route("register"));
        return null;
    }

    const confirmDelete = (commentId) => {
        if (window.confirm("Do you really want to delete this comment?")) {
            deleteComment(commentId);
        }
    };

    //    const deleteComment = (commentId) => {
    //        // Implement the logic to delete the comment here
    //        // For example, make an API request to your server to delete the comment
    //        // After successful deletion, you can update the UI accordingly
    //    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    comments Index
                </h2>
            }
        >
            <Head title="PostIndex" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-2xl mb-4">comments</h2>
                            <br></br>

                            <table className="table min-w-full">
                                <thead>
                                    <tr className="border px-4 py-2 text-center align-middle">
                                        <th className="text-center">Sr no</th>
                                        <th className="test-center">Post</th>
                                        <th className="text-center">
                                            Created By
                                        </th>
                                        <th className="text-center">
                                            Created At
                                        </th>
                                        <th className="text-center">
                                            Updated At
                                        </th>
                                        <th className="text-center">Image</th>
                                        <th className="text-center">Content</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comments.data.map((comment, index) => (
                                        <tr key={comment.id}>
                                            <td className=" border px-4 text-center align-middle">
                                                {index +
                                                    1 +
                                                    (comments.current_page -
                                                        1) *
                                                        comments.per_page}
                                            </td>
                                            <td className="border px-4 py-2 text-center align-middle">
                                                <Link
                                                    href={route(
                                                        "posts.readMore",
                                                        {
                                                            id: comment.post.id,
                                                            slug: comment.post
                                                                .slug,
                                                        }
                                                    )}
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    {comment.post.name}
                                                </Link>
                                            </td>
                                            <td className="border px-4 py-2 text-center align-middle">
                                                {comment.user.name}
                                            </td>
                                            <td className="border px-4 py-2 text-center align-middle">
                                                <Link
                                                    href={""}
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    {new Date(
                                                        comment.created_at
                                                    ).toLocaleDateString()}
                                                </Link>
                                            </td>
                                            <td className="border px-4 py-2 text-center align-middle">
                                                <Link
                                                    href={""}
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    {/* {comment.updated_at} */}
                                                    {new Date(
                                                        comment.updated_at
                                                    ).toLocaleDateString()}
                                                </Link>
                                            </td>

                                            <td className="border px-4 py-2">
                                                <img
                                                    src={comment.full_path}
                                                    width="200px"
                                                />
                                            </td>

                                            <td className=" border px-4 py-2 text-center align-middle">
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: comment.post
                                                            .content,
                                                    }}
                                                />
                                            </td>

                                            <td className="border px-4 py-2 text-center align-middle">
                                                <Link
                                                    href={route(
                                                        "comment.destroy",
                                                        {
                                                            id: comment.id,
                                                        }
                                                    )}
                                                    onClick={() =>
                                                        confirmDelete(
                                                            comment.id
                                                        )
                                                    }
                                                    className="text-red-500 hover:underline cursor-pointer"
                                                >
                                                    Delete
                                                </Link>
                                                {/* <Link
                                                    href={route(
                                                        "comment.destroy",
                                                        {
                                                            id: comment.id,
                                                        }
                                                    )}
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    Delete
                                                </Link> */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    {comments.links.map((link, index) => (
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
