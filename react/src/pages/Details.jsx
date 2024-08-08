import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { message } from "antd";
const Details = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const { user, token } = useContext(AuthContext);
    const getPost = async () => {
        const response = await fetch(`/api/posts/${id}`);
        const data = await response.json();

        if (response.ok) {
            setPost(data.post);
        }
    };

    useEffect(() => {
        getPost();
    }, []);

    const deleteHandler = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/posts/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (response.ok) {
            message.success(data.message);
            navigate("/");
        } else {
            message.error(data.message);
        }
    };
    return (
        <>
            <section className="w-[80%] ml-[10%] mt-10">
                <Link
                    to={"/"}
                    className="px-8 py-2 rounded-sm bg-blue-500 text-white text-sm font-mono"
                >
                    Back
                </Link>
                <div className="w-full shadow-md px-10 py-5 mt-5 border-2 border-t-blue-500 mb-5">
                    {post ? (
                        <>
                            <h1 className="text-center text-2xl font-mono text-blue-500 ">
                                {post.title}
                            </h1>
                            <div className="flex justify-between mt-5">
                                <p>
                                    Post By -{" "}
                                    <strong className="text-blue-500">
                                        {" "}
                                        {post.user.name}
                                    </strong>
                                </p>
                                <p>
                                    Created_at -{" "}
                                    <strong className="text-blue-500">
                                        {new Date(
                                            post.created_at
                                        ).toLocaleDateString()}
                                    </strong>
                                </p>
                            </div>
                            <p className="mt-5">{post.body}</p>
                            {user && user.id === post.user_id && (
                                <div className="flex justify-end">
                                    <Link
                                        to={`/update/${post.id}`}
                                        className="px-8 py-2 rounded-sm bg-orange-500 text-white text-sm font-mono"
                                    >
                                        Update
                                    </Link>

                                    <form onSubmit={deleteHandler}>
                                        <button
                                            type="submit"
                                            className="px-8 py-2 rounded-sm bg-red-500 text-white text-sm font-mono ml-2"
                                        >
                                            Delete
                                        </button>
                                    </form>
                                </div>
                            )}
                        </>
                    ) : (
                        <p className="text-center">Something went wrong</p>
                    )}
                </div>
            </section>
        </>
    );
};

export default Details;
