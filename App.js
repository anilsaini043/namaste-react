import React from "react";
import ReactDom from "react-dom/client";
import Header from "./src/components/Header.jsx";
import Body from "./src/components/Body.jsx";
import About from "./src/components/About.jsx";
import Contact from "./src/components/Contact.jsx";
import Error from "./src/components/Error.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const AppLayout = () => {
    return (
        <div className="app">
            <Header />
            <Body />
        </div>
    )
};

// Route configuration

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        errorElement: <Error />
    },
    {
        path: "/about",
        element: <About />
    },
    {
        path: "/contact",
        element: <Contact />
    }
])

const root = ReactDom.createRoot(document.getElementById("root"));

root .render(<RouterProvider router={appRouter}/>)