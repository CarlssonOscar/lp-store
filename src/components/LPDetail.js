import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import StoreContext from "../contexts/StoreContext";
import "../styles/LPDetail.css";

const LPDetail = () => {
    const { inventory, addToCart } = useContext(StoreContext);
    const { id } = useParams();
    const lp = inventory.find((lp) => lp.id === parseInt(id));

    if (!lp) {
        return <h2>LP not found</h2>;
    }

    return (
        <div className="lp-detail">
            <img src={lp.image} alt={lp.title} />
            <h2>{lp.title}</h2>
            <p>{lp.artist}</p>
            <p>${lp.price}</p>
            <p>{lp.description}</p>
            <p>Stock: {lp.stock}</p>
            <button onClick={() => addToCart(lp)}>Add to Cart</button>
            <Link to="/">Back to Selection</Link>
        </div>
    );
};

export default LPDetail;
