import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Index = () => {
    const { user } = useContext(AuthContext);
    return (
        <div>
            <h1>Home Page</h1>
            <p>
                {" "}
                {user ? `your name is ${user.name}` : "you are not register"}
            </p>
        </div>
    );
};

export default Index;
