import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function Index({ tags, auth }) {
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

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Tags Index
                </h2>
            }
        >
            <Head title="PostIndex" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-2xl mb-4">Tags</h2>
                            <table className="table min-w-full">
                                <thead>
                                    <tr className="border px-4 py-2 text-center align-middle">
                                        <th className="text-center">Sr no</th>
                                        <th className="test-center">Tag</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tags.data.map((tag, index) => (
                                        <tr key={tag.id}>
                                            <td className=" border px-4 text-center align-middle">
                                                {index +
                                                    1 +
                                                    (tags.current_page - 1) *
                                                        tags.per_page}
                                            </td>
                                            <td className="border px-4 py-2 text-center align-middle">
                                                {tag.name}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    {tags.links.map((link, index) => (
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
