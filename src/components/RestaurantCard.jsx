import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
    const { resData } = props;
    const { name, cloudinaryImageId, avgRating, cuisines, costForTwo } = resData?.info;
    
    return (
        <div className="m-4 p-4 w-[240px] rounded-lg bg-gray-100 hover:bg-gray-200 hover:shadow-lg">
            <img className="rounded-lg" src={CDN_URL+cloudinaryImageId} alt="res-logo" />
            <h3 className="font-bold py-4 text-lg">{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{avgRating} stars</h4>
            <h4>{costForTwo}</h4>
            <h4>{resData?.info?.sla.deliveryTime} minutes</h4>
        </div>
    );
};

export default RestaurantCard;