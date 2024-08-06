import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./layouts/Main";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const App = () => {
    const { user } = useContext(AuthContext);
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Main />,
            children: [
                {
                    index: true,
                    element: user ? <Index /> : <Login />,
                },
                {
                    path: "/register",
                    element: user ? <Index /> : <Register />,
                },
                {
                    path: "/login",
                    element: user ? <Index /> : <Login />,
                },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
};

export default App;
