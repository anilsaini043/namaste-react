import { CDN_URL } from "../utils/constants";

const ItemList = ({ items }) => {
    return (
        <div>
            {
                items.map((item) => (
                    <div key={item.card.info.id} className="p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between">
                        <div className="w-9/12">
                            <div className="py-2">
                                <span>{item.card.info.name}</span>
                                <span>
                                    {" "}
                                    - ₹{" "}
                                    {
                                        item.card.info.price ? item.card.info.price / 100 : item.card.info.defaultPrice / 100
                                    }
                                </span>
                            </div>
                            <p className="text-xs">{item.card.info.description}</p>
                        </div>
                        <div className="w-3/12 p-4">
                            <div className="w-full h-full aspect-[4/3] border border-gray-200 rounded">
                                <div className="absolute">
                                    <button className="bg-black text-white p-2 shadow-lg m-auto ">Add +</button>
                                </div>
                                <img
                                    src={CDN_URL + item.card.info.imageId}
                                    alt="Image"
                                    className="w-full h-full object-cover rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ItemList;