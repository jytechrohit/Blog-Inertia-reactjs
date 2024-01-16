import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Create from "../Comments/Create";
import { Inertia } from "@inertiajs/inertia";

// import CreateTag from "../Pages/Tags/Create";

import CreateTags from "../Tags/Create";

export default function Index({ post, auth, tags }) {
    const { user } = auth;
    // const page = usePage();
    if (!user) {
        Inertia.visit(route("register"));
        return null;
    }
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
                            <h2 className="text-2xl mb-4">
                                Post is {post.name}
                            </h2>
                            <div className="flex items-center mb-4">
                                <img
                                    src={post.full_path}
                                    width="300px"
                                    className="mr-4"
                                />
                                <div>
                                    <h3>Content here:</h3>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: post.content,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className=" flex p-6 text-gray-900">
                            <h3>Category :-</h3>
                            <Link
                                href={""}
                                className="text-blue-500 hover:underline"
                            >
                                {post.categories.name}
                            </Link>
                        </div>

                        <div className=" flex p-6 text-gray-900">
                            <h3>Created By :-</h3>
                            <Link
                                href={""}
                                className="text-blue-500 hover:underline"
                            >
                                {post.user.name}
                            </Link>
                        </div>
                        <div className=" flex p-6 text-gray-900">
                            <h3>created_at :-</h3>
                            <Link
                                href={""}
                                className="text-blue-500 hover:underline"
                            >
                                {new Date(post.created_at).toLocaleDateString()}
                            </Link>
                        </div>
                        <div className=" flex p-6 text-gray-900">
                            <h3>Updated_at :-</h3>
                            <Link
                                href={""}
                                className="text-blue-500 hover:underline"
                            >
                                {new Date(post.updated_at).toLocaleDateString()}
                            </Link>
                        </div>
                        <div className="p-6 text-gray-900">
                            <h3>Show Comment :-</h3>
                            <div className="p-6 text-gray-900">
                                {post.comment.map((comments, index) => (
                                    <div
                                        key={comments.id}
                                        className="bg-white p-4 shadow-md rounded-md flex items-center"
                                    >
                                        <div className="mr-4">
                                            <img
                                                src={comments.full_path}
                                                width="100px"
                                            />
                                        </div>
                                        <div>
                                            {index + 1} -: Created By:
                                            <Link
                                                href={""}
                                                className="text-blue-500 hover:underline"
                                            >
                                                {post.user.name}
                                            </Link>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: comments.content,
                                                }}
                                            />
                                            <div>
                                                Created At-:
                                                <Link
                                                    href={""}
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    {new Date(
                                                        comments.created_at
                                                    ).toLocaleDateString()}
                                                </Link>
                                            </div>
                                            <div>
                                                Updated At -:
                                                <Link
                                                    href={""}
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    {new Date(
                                                        comments.updated_at
                                                    ).toLocaleDateString()}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="align-left">
                                {auth.user && (
                                    <div className="py-8">
                                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                                <div className="p-6 text-gray-900">
                                                    <div className="text-center">
                                                        Add Comment
                                                    </div>
                                                    <Create
                                                        auth={auth}
                                                        postData={post}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-6 text-gray-900">
                            <h3>Show Tags :-</h3>
                            <div className="p-6 text-gray-900 flex flex-wrap">
                                {post.tags.map((tag, index) => (
                                    <div
                                        key={tag.id}
                                        className="bg-white p-4 shadow-md rounded-md flex items-center"
                                        style={{
                                            marginRight:
                                                index % 6 === 5 ? 0 : "14px",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        <div>
                                            <strong>{tag.name}</strong>{" "}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {auth.user && auth.user.id === post.user.id && (
                                <div className="p-6 text-gray-900">
                                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                            <div className="p-6 text-gray-900">
                                                <div className="text-center">
                                                    Create tag
                                                </div>

                                                <CreateTags
                                                    auth={auth}
                                                    tags={tags}
                                                    posts={post.id}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
