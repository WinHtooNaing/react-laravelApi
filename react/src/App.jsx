import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./layouts/Main";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Create from "./pages/Create";
import Details from "./pages/Details";
import Update from "./pages/Update";

const App = () => {
    const { user } = useContext(AuthContext);
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Main />,
            children: [
                {
                    index: true,
                    element: <Index />,
                },
                {
                    path: "/register",
                    element: user ? <Index /> : <Register />,
                },
                {
                    path: "/login",
                    element: user ? <Index /> : <Login />,
                },
                {
                    path: "/create",
                    element: user ? <Create /> : <Login />,
                },
                {
                    path: "/details/:id",
                    element: <Details />,
                },
                {
                    path: "/update/:id",
                    element: user ? <Update /> : <Index />,
                },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
};

export default App;
