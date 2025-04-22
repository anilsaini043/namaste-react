import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({ data, showIndex, setShowIndex }) => {

    const handleClickAccordion = () => {
        setShowIndex()
    }

    return (
        <div className="my-4 bg-gray-50 shadow-lg p-4">
            <div className="flex justify-between cursor-pointer" onClick={handleClickAccordion}>
                <span className="font-bold text-lg">{data?.title} ({data?.itemCards?.length})</span>
                <span>&#11015;</span>
            </div>
            {showIndex && <ItemList items={data.itemCards} />}
        </div>
    )
}

export default RestaurantCategory;