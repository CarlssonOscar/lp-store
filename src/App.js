// Import necessary libraries and components
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StoreProvider from "./contexts/StoreProvider";
import Header from "./components/Header";
import RobotList from "./components/RobotList";
import RobotDetail from "./components/RobotDetail";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Confirmation from "./components/Confirmation";
import "./styles/App.css";

// Define the main App component
function App() {
    return (
        // Wrap everything in the StoreProvider to make state accessible everywhere
        <StoreProvider>
            {/* Set a max-width for the entire application */}
            <div className="app-container">
                {/* Initialize the Router */}
                <Router>
                    {/* The Header component is displayed on all pages */}
                    <Header />
                    {/* Define the different routes and the components that should be rendered */}
                    <Routes>
                        <Route path="/" element={<RobotList />} />
                        <Route path="/robot/:id" element={<RobotDetail />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route
                            path="/confirmation"
                            element={<Confirmation />}
                        />
                    </Routes>
                </Router>
            </div>
        </StoreProvider>
    );
}

// Export the App component to be used in index.js
export default App;
