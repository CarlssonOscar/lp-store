import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import StoreContext from "../contexts/StoreContext";
import "../styles/RobotDetail.css";

const RobotDetail = () => {
    const { inventory, addToCart } = useContext(StoreContext);
    const { id } = useParams();
    const robot = inventory.find((robot) => robot.id === id);

    if (!robot) {
        return <h2>Robot not found</h2>;
    }

    return (
        <div className="robot-detail">
            <img src={robot.image} alt={robot.name} />
            <h2>{robot.name}</h2>
            <p>${robot.price}</p>
            <p>Stock: {robot.inStock}</p>
            <button onClick={() => addToCart(robot)}>Add to Cart</button>
            <Link to="/">Back to Selection</Link>
        </div>
    );
};

export default RobotDetail;
