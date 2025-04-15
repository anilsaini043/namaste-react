import { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard.jsx";
import ShimmerUI from "./ShimmerUI.jsx";
import { Link } from "react-router-dom";

const Body = () => {

    // useState is a Local state variable - - Super powerful variable
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [searchedRestro, setSearchedRestro] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.959514&lng=77.714024&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
        const json = await data.json();
        const restroList = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants  // Optional chaining
        setListOfRestaurants(restroList);
        setSearchedRestro(restroList)
    }

    const handleTopRatedRestaurants = () => {
        const filteredRest = listOfRestaurants.filter((el) => el.info.avgRating > 4.2);
        setSearchedRestro(filteredRest);
    }

    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value)
    }

    const handleSearchClick = (e) => {
        const searchList = listOfRestaurants.filter((el) => el.info.name.includes(searchText));
        setSearchedRestro(searchList)
    }

    return listOfRestaurants.length === 0 ? <ShimmerUI /> : (
        <div className="body">
            <div className="filter-action">
                <div>
                    <input type="text" value={searchText} onChange={handleSearchTextChange} placeholder="Search here..." />
                    <button className="button" onClick={handleSearchClick}>Search</button>
                </div>
                <button className="button" onClick={handleTopRatedRestaurants}>
                    Top rated restaurants
                </button>
            </div>
            <div className="res-container">
                {
                    searchedRestro.map((restaurant) => (
                        <Link to={"/restaurants/" + restaurant?.info?.id} key={restaurant?.info?.id}>
                            <RestaurantCard resData={restaurant} />
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Body;