import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Index = () => {
    const [posts, setPosts] = useState([]);
    const getPosts = async () => {
        const response = await fetch("/api/posts");
        const data = await response.json();
        if (response.ok) {
            setPosts(data);
        }
    };
    useEffect(() => {
        getPosts();
    }, []);

    return (
        <>
            <div>
                <h1 className="text-center text-3xl text-blue-500 font-mono font-bold mt-10">
                    Latest Posts
                </h1>

                <div className="flex flex-wrap justify-center gap-6 sm:gap-3 mt-14 ">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div
                                className="w-full sm:w-2/3 md:w-1/4   mb-4  border-2 border-bg-gray-100  max-sm:mx-10 shadow-md"
                                key={post.id}
                            >
                                <p className="text-xl font-mono font-bold text-center text-blue-500 py-5 ">
                                    {post.title.substring(0, 20)}
                                </p>

                                <p className="text-md font-sans text-center pb-5">
                                    {post.body.substring(0, 100)}...
                                </p>
                                <p className="text-sm font-mono font-semibold text-blue-700 pl-3 pb-3">
                                    Post By - {post.user.name}
                                </p>
                                <Link
                                    to={`/details/${post.id}`}
                                    className="flex justify-center py-3 px-7 bg-blue-500 text-white"
                                >
                                    See More
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-xl font-thin text-gray-900 mt-[10%]">
                            There are no posts:
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Index;
