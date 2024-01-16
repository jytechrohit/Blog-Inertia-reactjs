import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function Index({ categories, auth }) {
    const { user } = auth;
    if (!user) {
        Inertia.visit(route("register"));
        return null;
    }

    // const { isAuthenticated } = usePage();

    // if (!isAuthenticated) {
    //     //  <LoginForm href={route("login")}></LoginForm>;
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
                    Category
                </h2>
            }
        >
            <Head title="category" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 text-center">
                            <h2 className="text-2xl mb-4 ">Category List</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {categories.data.map((category) => (
                                <div
                                    key={category.id}
                                    className="bg-white p-4 shadow-md rounded-md"
                                >
                                    <p className="text-center font-semibold text-lg">
                                        {category.name}
                                    </p>
                                    <br />
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {category.posts.map((post) => (
                                            <div
                                                key={post.id}
                                                className="bg-white p-4 shadow-md rounded-md"
                                            >
                                                <p className="text-center font-semibold text-lg">
                                                    <img
                                                        src={post.full_path}
                                                        className="mx-auto mb-4"
                                                        width="150px"
                                                        alt={post.title}
                                                    />
                                                </p>
                                                <p className="text-center font-semibold text-lg">
                                                    {post.title}
                                                </p>
                                                <br />
                                                <div className="flex justify-center mt-4">
                                                    <Link
                                                        href={route(
                                                            "posts.readMore",
                                                            {
                                                                id: post.id,
                                                                title: post.title,
                                                            }
                                                        )}
                                                        className="text-blue-500 hover:underline"
                                                    >
                                                        Read More
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <br />
                                    <div className="flex justify-center mt-4">
                                        <Link
                                            href={route(
                                                "category.categoryList",
                                                {
                                                    id: category.id,
                                                    category: category.slug,
                                                }
                                            )}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Category List
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
