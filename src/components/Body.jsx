import { useEffect } from "react";
import RestaurantCard from "./RestaurantCard.jsx";
import resList from "../utils/mockData.js";

const Body = () => {
    return (
        <div className="body">
            <div className="search">Search</div>
            <div className="res-container">
                {
                    resList.map((restaurant) => (
                        <RestaurantCard key={restaurant?.data?.id} resData={restaurant} />
                    ))
                }
            </div>
        </div>
    )
}

export default Body;