import React, { lazy, Suspense, useState } from "react";
import ReactDom from "react-dom/client";
import Header from "./src/components/Header.jsx";
import Body from "./src/components/Body.jsx";
import About from "./src/components/About.jsx";
import Contact from "./src/components/Contact.jsx";
import Error from "./src/components/Error.jsx";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import RestaurantMenu from "./src/components/RestaurantMenu.jsx";
// import Grocery from "./src/components/Grocery.jsx";
import UserContext from "./src/utils/UserContext.jsx";

const Grocery = lazy(()=> import("./src/components/Grocery.jsx"))   // Now loading component with lazy loading

const AppLayout = () => {
    const [ user, setUser ] = useState("Anil");
    return (
        <div className="app">
            <UserContext.Provider value={{user, setUser}}>
                <Header />
                {/* When the route change than Outlet component filled with children */}
                <Outlet />
            </UserContext.Provider>
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