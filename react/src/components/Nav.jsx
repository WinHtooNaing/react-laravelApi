import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { message } from "antd";
const Nav = () => {
    const navigate = useNavigate();
    const { user, setToken, setUser, token } = useContext(AuthContext);
    const LogoutHandler = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/logout", {
            method: "post",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        console.log(data);

        if (response.ok) {
            setToken(null);
            setUser(null);
            localStorage.removeItem("token");
            message.success(data.message);
            navigate("/login");
        } else {
            message.error("something went wrong");
        }
    };
    return (
        <>
            <nav className="w-full h-16  shadow-md text-blue-500 flex justify-between px-[10%] max-sm:px-[5%] items-center ">
                <h1 className="text-xl max-sm:text-lg font-mono font-bold">
                    React-LaravelApi
                </h1>
                <ul className="flex ">
                    {user ? (
                        <>
                            <li className="px-5 max-sm:px-2 hover:text-blue-700 font-mono cursor-none">
                                <Link to={"#"}>Hello...{user.name}</Link>
                            </li>
                            <li className="px-5 max-sm:px-2 hover:text-blue-700 font-mono">
                                <form onClick={LogoutHandler}>
                                    <button>Logout</button>
                                </form>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="px-5 max-sm:px-2 hover:text-blue-700 font-mono">
                                <Link to={"/register"}>Register</Link>
                            </li>
                            <li className="px-5 max-sm:px-2 hover:text-blue-700 font-mono">
                                <Link to={"/login"}>Login</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </>
    );
};

export default Nav;
