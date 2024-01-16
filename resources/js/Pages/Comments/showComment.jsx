import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function showComment({ post, auth }) {
    const { user } = auth;
    if (!user) {
        Inertia.visit(route("register"));
        return null;
    }
    console.log(post.name);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Comment List
                </h2>
            }
        >
            <Head title="category" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 text-center">
                            <h2 className="text-2xl mb-4 ">
                                Show the Comments Post Vise -: {post.name}
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                            {post.comment.map((comments) => (
                                <div
                                    key={comments.id}
                                    className="bg-white p-4 shadow-md rounded-md"
                                >
                                    <p className="text-center font-semibold text-lg">
                                        <img
                                            src={comments.full_path}
                                            className="mx-auto mb-4"
                                            width="150px"
                                            alt={comments.slug}
                                        />
                                    </p>
                                    <p className="text-center font-semibold text-lg">
                                        Comment-:
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: comments.content,
                                            }}
                                        />
                                    </p>
                                    <p className="text-center font-semibold text-lg">
                                        Created By -: {post.user.name} &&
                                        Created At -:
                                        <Link
                                            href={""}
                                            className="text-blue-500 hover:underline"
                                        >
                                            {/* //{post.created_at} */}
                                            {new Date(
                                                comments.created_at
                                            ).toLocaleDateString()}
                                        </Link>
                                    </p>
                                    <p className="text-center font-semibold text-lg">
                                        Updated At :-
                                        <Link
                                            href={""}
                                            className="text-blue-500 hover:underline"
                                        >
                                            {new Date(
                                                comments.updated_at
                                            ).toLocaleDateString()}
                                        </Link>
                                    </p>

                                    <br />
                                    {/* <div className="flex justify-center mt-4">
                                        <Link
                                            href={route("posts.readMore", {
                                                id: post.id,
                                                title: post.title,
                                            })}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Read More
                                        </Link>
                                    </div> */}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
