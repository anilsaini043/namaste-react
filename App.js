import React, { lazy, Suspense } from "react";
import ReactDom from "react-dom/client";
import Header from "./src/components/Header.jsx";
import Body from "./src/components/Body.jsx";
import About from "./src/components/About.jsx";
import Contact from "./src/components/Contact.jsx";
import Error from "./src/components/Error.jsx";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import RestaurantMenu from "./src/components/RestaurantMenu.jsx";
// import Grocery from "./src/components/Grocery.jsx";

const Grocery = lazy(()=> import("./src/components/Grocery.jsx"))   // Now loading component with lazy loading

const AppLayout = () => {
    return (
        <div className="app">
            <Header />
            {/* When the route change than Outlet component filled with children */}
            <Outlet />
        </div>
    )
};

// Route configuration

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Body />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/restaurants/:resId",
                element: <RestaurantMenu />
            },
            {
                path: "/grocery",
                element: <Suspense fallback={<h1>Loading ...</h1>}><Grocery /></Suspense>
            }
        ],
        errorElement: <Error />
    }
])

const root = ReactDom.createRoot(document.getElementById("root"));

root .render(<RouterProvider router={appRouter}/>)