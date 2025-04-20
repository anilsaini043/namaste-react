import ShimmerUI from "./ShimmerUI";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {

    const { resId } = useParams()  // This is another hook

    const resInfo = useRestaurantMenu(resId)

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
                    itemCards?.map((item) => (
                        <li key={item.card.info.id}>{item.card.info.name} - {"Rs"} {item.card.info.defaultPrice / 100 || item.card.info.price / 100}</li>
                    ))
                }
            </ul>
        </div>
    )

}

export default RestaurantMenu;