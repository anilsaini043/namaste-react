import ShimmerUI from "./ShimmerUI";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
    const [showIndex, setShowIndex] = useState(null);

    const { resId } = useParams()  // This is another hook
    const resInfo = useRestaurantMenu(resId) // Use of HOC 

    if (resInfo === null) return <ShimmerUI />  // This condition need to handle the resInfo initially "null"

    const { name, cuisines, costForTwoMessage, cloudinaryImageId } = resInfo?.cards[2]?.card?.card?.info;
    const { itemCards } = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;

    const categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (c) => c?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")

    return (
        <div className="w-6/12 m-auto text-center mt-10">
            <h1 className="my-5 font-bold text-2xl">{name}</h1>
            <p className="mb-5 font-bold text-xl">
                {cuisines.join(", ")} - {costForTwoMessage}
            </p>
            {/* Category accordian */}
            {
                categories.map((category, index) => (
                    <RestaurantCategory key={index} data={category?.card?.card} showItems={showIndex === index ? true : false} setShowIndex={() => setShowIndex(index)} />
                ))
            }
        </div>
    )

}

export default RestaurantMenu;