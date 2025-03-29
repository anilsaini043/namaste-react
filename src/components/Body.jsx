import { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard.jsx";
import ShimmerUI from "./ShimmerUI.jsx";

const Body = () => {

    const [listOfRestaurants, setListOfRestaurants] = useState([])

    useEffect(()=>{
        fetchData()
    }, [])
    
    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.959514&lng=77.714024&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
        const json = await data.json();
        const restroList = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants  // Optional chaining
        setListOfRestaurants(restroList)
    }

    const handleToRatedRestaurants = () => {
        const filteredRest = listOfRestaurants.filter((el) => el.info.avgRating > 4.5);
        console.log("filterres", filteredRest)
        setListOfRestaurants(filteredRest);
    }

    // Conditional rendering
    if(listOfRestaurants.length === 0){
        return <ShimmerUI />
    }

    return (
        <div className="body">
            <div className="filter-row">
                <button className="button" onClick={handleToRatedRestaurants}>
                    Top rated restaurants
                </button>
            </div>
            <div className="res-container">
                {
                    listOfRestaurants.map((restaurant) => (
                        <RestaurantCard key={restaurant?.info?.id} resData={restaurant} />
                    ))
                }
            </div>
        </div>
    )
}

export default Body;