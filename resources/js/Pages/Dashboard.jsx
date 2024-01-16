import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Create from "../Pages/Comments/Create";

import LoginForm from "../Pages/Auth/Login";
import CreateTag from "../Pages/Tags/Create";

import { Inertia } from "@inertiajs/inertia";

export default function Dashboard({ posts, tags, auth }) {
    const { user } = auth;
    if (!user) {
        Inertia.visit(route("register"));
        return null;
    }

    const isContentLong = (content) => {
        const lines = content.split("\n");
        return lines.length > 50;
    };
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
                    List of Post
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-16">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="text-center align-middle p-6 text-gray-900">
                                <strong>
                                    Post List of{" "}
                                    {auth.user.name.charAt(0).toUpperCase() +
                                        auth.user.name.slice(1)}{" "}
                                    User
                                </strong>
                            </div>
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
                                    Category -:
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
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: post.content,
                                        }}
                                    />
                                </p>

                                {post.comment.length > 0 && (
                                    <div className="p-6 text-gray-900">
                                        <h3>Show Comment :-</h3>
                                        <div className="p-6 text-gray-900">
                                            {post.comment.map(
                                                (comments, index) => (
                                                    <div
                                                        key={comments.id}
                                                        className="bg-white p-4 shadow-md rounded-md flex items-center"
                                                    >
                                                        <div className="mr-4">
                                                            <img
                                                                src={
                                                                    comments.full_path
                                                                }
                                                                width="100px"
                                                            />
                                                        </div>
                                                        <div>
                                                            {index + 1} -:
                                                            Created By:
                                                            <Link
                                                                href={""}
                                                                className="text-blue-500 hover:underline"
                                                            >
                                                                {
                                                                    comments
                                                                        .user
                                                                        .name
                                                                }
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
                                                            {/* {console.log(
                                                                comments.user.id
                                                            )} */}
                                                            {auth.user.id ===
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
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* <div className="p-6 text-gray-900">
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

                                                            <CreateTag
                                                                auth={auth}
                                                                tags={tags}
                                                                s
                                                                posts={post.id}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                </div> */}

                                {post.comment.length === 0 && (
                                    <div className="p-6 text-gray-900 text-center align-middle">
                                        <p>
                                            No comments available for this post.
                                            Add Comment Here ~~
                                        </p>
                                    </div>
                                )}

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

                                {post.comment.length > 0 && (
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
                                )}

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
        </AuthenticatedLayout>
    );
}

// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Head, Link } from "@inertiajs/react";

// export default function Dashboard({ posts, auth }) {
//     const isContentLong = (content) => {
//         const lines = content.split("\n");
//         return lines.length > 50;
//     };

//     return (
//         <AuthenticatedLayout
//             user={auth.user}
//             header={
//                 <h2 className="font-semibold text-xl text-gray-800 leading-tight">
//                     Dashboard
//                 </h2>
//             }
//         >
//             <Head title="Dashboard" />

//             <div className="py-16">
//                 <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
//                     <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
//                         <div className="p-6 text-gray-900">Post List Here</div>
//                     </div>

//                     <div className="p-6 text-gray-900">
//                         <h2 className="text-2xl mb-4">Latest Posts</h2>
//                         <ul>
//                             {posts.data.map((post, index) => (
//                                 <li key={post.id}>
//                                     Sr no. is
//                                     {index +
//                                         1 +
//                                         (posts.current_page - 1) *
//                                             posts.per_page}
//                                     Post is {post.title}
//                                     <img src={post.full_path} width="200px" />
//                                     {post.title}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>

//                     <table className="table min-w-full">
//                         <thead>
//                             <tr>
//                                 <th className="text-center">Sr no</th>
//                                 <th className="text-center">User Id</th>
//                                 <th className="text-center">Image</th>
//                                 <th className="text-center">Title</th>
//                                 <th className="text-center">Content</th>
//                                 <th className="text-center">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {posts.data.map((post, index) => (
//                                 <tr key={post.id}>
//                                     <td className="text-center align-middle">
//                                         {index +
//                                             1 +
//                                             (posts.current_page - 1) *
//                                                 posts.per_page}
//                                     </td>
//                                     <td className="text-center align-middle">
//                                         {post.user_id}
//                                     </td>
//                                     <td className="border px-4 py-2">
//                                         <img
//                                             src={post.full_path}
//                                             width="200px"
//                                         />
//                                     </td>
//                                     <td className="text-center align-middle">
//                                         {post.title}
//                                     </td>
//                                     <td className="text-center align-middle">
//                                         {isContentLong(post.content) ? (
//                                             <Link
//                                                 href={`/posts/${post.id}`}
//                                                 className="text-blue-500 hover:underline"
//                                             >
//                                                 Read More
//                                             </Link>
//                                         ) : (
//                                             post.content
//                                         )}
//                                     </td>
//                                     <td className="text-center align-middle">
//                                         <Link
//                                             href={route("posts.readMore", {
//                                                 id: post.id,
//                                             })}
//                                             className="text-blue-500 hover:underline"
//                                         >
//                                             Read More
//                                         </Link>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                     <div className="align-middle">
//                         <nav aria-label="Page navigation example align-middle">
//                             <ul className="pagination">
//                                 {posts.links.map((link, index) => (
//                                     <li
//                                         key={index + 1}
//                                         className={`page-item ${
//                                             link.active ? "active" : ""
//                                         }`}
//                                     >
//                                         <Link
//                                             href={link.url}
//                                             className="page-link"
//                                         >
//                                             <div
//                                                 dangerouslySetInnerHTML={{
//                                                     __html: link.label,
//                                                 }}
//                                             />
//                                         </Link>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </nav>
//                     </div>
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }
