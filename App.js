import React from "react";
import ReactDom from "react-dom/client";
import Header from "./src/components/Header.jsx";
import Body from "./src/components/Body.jsx";

const AppLayout = () => {
    return (
        <div className="app">
            <Header />
            <Body />
        </div>
    )
};

const root = ReactDom.createRoot(document.getElementById("root"));

root .render(<AppLayout/>)