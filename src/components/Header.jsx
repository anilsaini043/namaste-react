import { useState, useContext } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Header = () => {
    
    const [login, setLogin] = useState("Login") ;
    const onlineStatus = useOnlineStatus();

    const { user }= useContext(UserContext)  // Data from context api


    return (
        <div className="flex justify-between bg-pink-100 shadow-lg">
            <div className="logo-container">
                <img className="w-25" src={LOGO_URL} alt="logo" />
            </div>
            <div className="flex items-center">
                <ul className="flex p-4 m-4 gap-8">
                    <li>Online status : {onlineStatus ? "✅" : "🔴"}</li>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                    <li><Link to="/grocery">Grocery</Link></li>
                    <li>Cart</li> 
                    <li className="font-bold">{user}</li>
                    <button className="button" onClick={()=> login === "Login" ? setLogin("Logout") : setLogin("Login")}>{login}</button>
                </ul>
            </div>
        </div>
    );
};

export default Header;