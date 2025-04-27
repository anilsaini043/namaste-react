import { useState, useEffect, useContext } from "react";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard.jsx";
import ShimmerUI from "./ShimmerUI.jsx";
import { Link } from "react-router-dom";
import UserContext from "../utils/UserContext.jsx";

const Body = () => {

    // useState is a Local state variable - - Super powerful variable
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);
    const [searchText, setSearchText] = useState("");

    const RestaurantPromotedCard = withPromotedLabel(RestaurantCard) // HOC
    const { user, setUser } = useContext(UserContext)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.959514&lng=77.714024&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
        const json = await data.json();
        const restroList = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants  // Optional chaining
        setListOfRestaurants(restroList);
        setFilteredRestaurant(restroList)
    }

    const handleTopRatedRestaurants = () => {
        const filteredRest = listOfRestaurants.filter((el) => el.info.avgRating > 4.2);
        setFilteredRestaurant(filteredRest);
    }

    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value)
    }

    const handleSearchClick = (e) => {
        const searchList = listOfRestaurants.filter((el) => el.info.name.includes(searchText));
        setFilteredRestaurant(searchList)
    }

    return listOfRestaurants.length === 0 ? <ShimmerUI /> : (
        <div className="body">
            <div className="filter-action flex justify-between p-4 m-4">
                <div>
                    <input type="text" className="w-100 border border-solid border-black p-2 rounded" value={searchText} onChange={handleSearchTextChange} placeholder="Search here..." />
                    <button className="px-8 py-2 ml-2 text-white border border-solid border-green-600 bg-green-600 rounded" onClick={handleSearchClick}>Search</button>
                    <button className="px-8 py-2 ml-10 text-white border border-solid border-green-600 bg-green-600 rounded" onClick={handleTopRatedRestaurants}>
                        Top rated restaurants
                    </button>
                </div>
                
                {/* Update context value */}
                <div>
                    <label>Update logged user : </label>
                    <input className="border p-2 rounded placeholder-gray-400" type="text" placeholder="Update context api value here..." value={user} onChange={(e) => setUser(e.target.value)} />
                </div>
            </div>
            <div className="flex flex-wrap">
                {
                    filteredRestaurant.map((restaurant) => (
                        <Link to={"/restaurants/" + restaurant?.info?.id} key={restaurant?.info?.id}>
                            {
                                restaurant.info.avgRating > 4.5 ? <RestaurantPromotedCard resData={restaurant} /> : <RestaurantCard resData={restaurant} />
                            }
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Body;