"use client";

import { useState, useContext } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../app/firebase.js";
import "./pantry.css";
import { AuthContext } from "../authContext.js";

export default function PantryItem({ id, name }) {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext); // Get user context

  const handleRemoveFromPantry = async (itemId) => {
    setLoading(true);
    try {
      const itemRef = doc(db, user.uid, itemId); // Correct reference using the itemId
      await deleteDoc(itemRef);
      console.log(`${itemId} removed from pantry`);
    } catch (error) {
      console.error("Failed to remove item from pantry:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pantry-item">
      <div className="item-info">
        <h2>{name}</h2>
        <div className="item-buttons">
          <button
            className="btn btn-remove"
            onClick={() => handleRemoveFromPantry(id)} // Pass the id of the item
            disabled={loading}
          >
            {loading ? "Removing..." : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
}
