import { useEffect, useState } from "react";
import ShimmerUI from "./ShimmerUI";
import { MENU_API } from "../utils/constants";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {

    const [resInfo, setResInfo] = useState(null)
    const { resId } = useParams()  // This is another hook

    useEffect(() => {
        fetchMenu()
    }, [])

    const fetchMenu = async () => {
        const data = await fetch(MENU_API + resId)
        const json = await data.json();
        setResInfo(json.data)
    }

    if (resInfo === null) return <ShimmerUI />  // This condition need to handle the resInfo initially "null"

    const { name, cuisines, costForTwoMessage, cloudinaryImageId } = resInfo?.cards[2]?.card?.card?.info;
    const { itemCards } = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;

    return (
        <div className="menu">
            <h1>{name}</h1>
            <p>
                {cuisines.join(", ")} - {costForTwoMessage}
            </p>
            <ul>
                {
                    itemCards.map((item) => (
                        <li key={item.card.info.id}>{item.card.info.name} - {"Rs"} {item.card.info.defaultPrice / 100 || item.card.info.price / 100}</li>
                    ))
                }
            </ul>
        </div>
    )

}

export default RestaurantMenu;