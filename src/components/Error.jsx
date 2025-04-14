import { useRouteError } from "react-router-dom";

const Error = () => {
    const err = useRouteError();
    return (
        <>
            <h1>Oops ... !!! something went wrong</h1>
            <h2>Status : {err.status} - {err.statusText}</h2>
        </>
    )
}

export default Error;