import React, { useContext } from "react";
import { Link } from "react-router-dom";
import StoreContext from "../contexts/StoreContext";
import "../styles/RobotList.css";

const RobotList = () => {
    const { inventory } = useContext(StoreContext);

    return (
        <div className="robot-list">
            {inventory.map((robot) => (
                <Link
                    to={`/robot/${robot.id}`}
                    key={robot.id}
                    className="robot-item"
                >
                    <img
                        src={robot.image}
                        alt={robot.name}
                        className="robot-image"
                    />
                    <h2>{robot.name}</h2>
                    <p>${robot.price}</p>
                </Link>
            ))}
        </div>
    );
};

export default RobotList;
