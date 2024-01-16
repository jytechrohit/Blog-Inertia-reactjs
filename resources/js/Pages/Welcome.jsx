import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Create from "../Pages/Comments/Create";

import CreateTags from "../Pages/Tags/Create";

export default function Welcome({ categories, posts, users, tags, auth }) {
    {
        // console.log("auth.user id is ", auth.user.name);
        //  console.log(posts);
        // <Create auth={auth.user.id} postData={posts} />;
        const confirmDelete = (commentId) => {
            if (window.confirm("Do you really want to delete this comment?")) {
                deleteComment(commentId);
            }
        };
    }

    const links = [
        {
            name: "Php Language",
            href: "",
        },

        { name: "Python Language", href: "" },
        { name: "Java Language", href: "#" },
        { name: "C Language", href: "#" },
        { name: "C++ Language", href: "#" },
    ];
    const today = new Date();
    const lastSevenDays = new Date(today);
    lastSevenDays.setDate(today.getDate() - 7);

    const postsLastSevenDays = posts.data.filter((post) => {
        const postDate = new Date(post.created_at);
        // Compare only the date portion
        return (
            postDate.toISOString().split("T")[0] >=
            lastSevenDays.toISOString().split("T")[0]
        );
    });
    //console.log(postDate)

    const stats = [
        { name: "Total Posts", value: posts.total },
        { name: "Total Customer", value: users },
        {
            name: "Posts Created in Last 7 Days",
            value: postsLastSevenDays.length,
        },
        { name: "Paid time off", value: "Unlimited" },
    ];

    return (
        <>
            <Head title="PostIndex" />
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo03"
                        aria-controls="navbarTogglerDemo03"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="#">
                        Home
                    </a>
                    <a className="navbar-brand" href="#">
                        Posts
                    </a>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarTogglerDemo03"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a
                                    className="nav-link active"
                                    aria-current="page"
                                    href="#"
                                >
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Link
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link disabled"
                                    aria-disabled="true"
                                >
                                    Disabled
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div>
                <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-end">
                    {auth.user ? (
                        <Link
                            href={route("dashboard")}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route("register")}
                                className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
                <img
                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
                    alt=""
                    className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
                />
                <div
                    className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
                    aria-hidden="true"
                >
                    <div
                        className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                    />
                </div>
                <div
                    className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
                    aria-hidden="true"
                >
                    <div
                        className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                    />
                </div>
                <div className="text mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            Tech Post's Here
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Graphic design is a dynamic and creative field that
                            revolves around visual communication. So, it means
                            using images, typography, and layout to convey your
                            ideas, messages .
                        </p>
                    </div>
                    <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                        <div className="text-center align-middle grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
                            {categories.map((category) => (
                                <a key={category}>
                                    {/* {link.name}{" "} */}
                                    <Link>{category.name}</Link>

                                    <span aria-hidden="true">&rarr;</span>
                                </a>
                            ))}
                        </div>
                        <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                            {stats.map((stat) => (
                                <div
                                    key={stat.name}
                                    className="flex flex-col-reverse"
                                >
                                    <dt className="text-base leading-7 text-gray-300">
                                        {stat.name}
                                    </dt>
                                    <dd className="text-2xl font-bold leading-9 tracking-tight text-white">
                                        {stat.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>

            <div className="py-16">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="text-center align-middle p-6 text-gray-900">
                            <strong>Post List of User</strong>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                        {posts.data.map((post, index) => (
                            <div
                                key={post.id}
                                className="bg-white p-4 shadow-md rounded-md"
                            >
                                <p className="text-center font-semibold text-lg">
                                    {post.name}
                                </p>
                                <br></br>
                                <a
                                    href={route("posts.readMore", {
                                        id: post.id,
                                        slug: post.slug,
                                    })}
                                >
                                    <img
                                        src={post.full_path}
                                        className="mx-auto mb-4"
                                        width="150px"
                                        alt={post.slug}
                                    />
                                </a>
                                <p className="text-center font-semibold text-lg">
                                    Categories -:
                                    <Link
                                        href={route("category.categoryList", {
                                            id: post.categories.id,
                                            category: post.categories.slug,
                                        })}
                                        className="text-blue-500 hover:underline"
                                    >
                                        {post.categories.name}
                                    </Link>
                                </p>
                                <br></br>
                                <p className="text-center font-semibold text-lg">
                                    {/* <ReactQuill
                                        theme="snow"
                                        value={post.content}
                                        readOnly={true}
                                    /> */}
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: post.content,
                                        }}
                                    />
                                </p>
                                <br></br>
                                <div className="p-6 text-gray-900">
                                    <h3>Show Tags :-</h3>
                                    <div className="p-6 text-gray-900 flex flex-wrap">
                                        {post.tags.map((tag, index) => (
                                            <div
                                                key={tag.id}
                                                className="bg-white p-4 shadow-md rounded-md flex items-center"
                                                style={{
                                                    marginRight:
                                                        index % 6 === 5
                                                            ? 0
                                                            : "14px",
                                                    marginBottom: "10px",
                                                }}
                                            >
                                                <div>
                                                    <strong>{tag.name}</strong>{" "}
                                                </div>

                                                <div>
                                                    <Link
                                                        href={route(
                                                            "tags.destroy",
                                                            {
                                                                id: tag.id,
                                                            }
                                                        )}
                                                        className="text-red-500 hover:underline cursor-pointer"
                                                    >
                                                        Delete
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {auth.user &&
                                        auth.user.id === post.user.id && (
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
                                {/* <h3>Show Tags is here :-</h3>
                                <div className="p-6 text-gray-900 flex flex-wrap">
                                    {post.post_tags.map((post_tag, index) => (
                                        <div
                                            key={post_tag.id}
                                            className="bg-white p-4 shadow-md rounded-md flex items-center"
                                            style={{
                                                marginRight:
                                                    index % 6 === 5
                                                        ? 0
                                                        : "14px",
                                                marginBottom: "10px",
                                            }}
                                        >
                                            <div>
                                                <strong>
                                                    {/* {post_tag.tags.name} */}
                                {/* {post_tag.tag_id}
                                                </strong>{" "}
                                            </div> */}
                                {/* <div>
                                                <Link
                                                    href={route(
                                                        "tags.destroy",
                                                        {
                                                            id: post_tag.id,
                                                        }
                                                    )}
                                                    className="text-red-500 hover:underline cursor-pointer"
                                                >
                                                    Delete
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div> */}{" "}
                                {/* */} *
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
                                <br></br>
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
                                                        {comments.user.name}
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
                                                    {auth.user &&
                                                        auth.user.id ===
                                                            comments.user_id && (
                                                            <div>
                                                                <Link
                                                                    href={route(
                                                                        "comment.destroy",
                                                                        {
                                                                            id: comments.id,
                                                                        }
                                                                    )}
                                                                    onClick={() =>
                                                                        confirmDelete(
                                                                            comments.id
                                                                        )
                                                                    }
                                                                    className="text-red-500 hover:underline cursor-pointer"
                                                                >
                                                                    Delete
                                                                    Comment
                                                                </Link>
                                                            </div>
                                                        )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-center mt-4">
                                    <Link
                                        href={route("comment.commentList", {
                                            id: post.id,
                                            slug: post.slug,
                                        })}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Show all Comments
                                    </Link>
                                </div>
                                <div className="flex justify-center mt-4">
                                    Read More About the post -:
                                    <Link
                                        href={route("posts.readMore", {
                                            id: post.id,
                                            slug: post.slug,
                                        })}
                                        className="text-blue-500 hover:underline"
                                    >
                                        {post.name}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6">
                        <nav aria-label="Page navigation example align-middle">
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
        </>
    );
}

// import { Link, Head } from "@inertiajs/react";
// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

// export default function Welcome({ posts, auth, laravelVersion, phpVersion }) {
//     return (
//         <>
//             <Head title="Welcome" />
//             <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
//                 <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-end">
//                     {auth.user ? (
//                         <Link
//                             href={route("dashboard")}
//                             className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
//                         >
//                             Dashboard
//                         </Link>
//                     ) : (
//                         <>
//                             <Link
//                                 href={route("login")}
//                                 className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
//                             >
//                                 Log in
//                             </Link>

//                             <Link
//                                 href={route("register")}
//                                 className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
//                             >
//                                 Register
//                             </Link>
//                         </>
//                     )}
//                 </div>
//             </div>

//             <style>{`
//                 .bg-dots-darker {
//                     background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
//                 }
//                 @media (prefers-color-scheme: dark) {
//                     .dark\\:bg-dots-lighter {
//                         background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
//                     }
//                 }
//             `}</style>
//         </>
//     );
// }
