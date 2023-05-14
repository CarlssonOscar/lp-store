import React, { useContext } from "react";
import { Link } from "react-router-dom";
import StoreContext from "../contexts/StoreContext";
import "../styles/LPList.css";

const LPList = () => {
    const { inventory } = useContext(StoreContext);

    return (
        <div className="lp-list">
            {inventory.map((lp) => (
                <Link to={`/lp/${lp.id}`} key={lp.id} className="lp-item">
                    <img src={lp.image} alt={lp.title} className="lp-image" />
                    <h2>{lp.title}</h2>
                    <p>{lp.artist}</p>
                    <p>${lp.price}</p>
                </Link>
            ))}
        </div>
    );
};

export default LPList;
