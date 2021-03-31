import React, { useState } from "react";
import { resetP, updateMax, updateEtat } from "../../../tools/axios";
import "./style.css";

export const AdminCard = ({ data, users, refrech }) => {
  const [maxi, setMaxi] = useState(users.group.max);

  const Reset = () => {
    resetP(data.user.groupID).then((e) => {
      refrech(data.user.id);
    });
  };

  const UpdateMax = () => {
    updateMax(data.user.id, data.user.groupID, maxi).then((e) => {
      refrech(data.user.id);
    });
  };

  const isOpen = () => {
    if (users.group.isOpen === 1) {
      updateEtat(0, users.group.id).then((e) => {
        refrech(data.user.id);
      });
    } else {
      updateEtat(1, users.group.id).then((e) => {
        refrech(data.user.id);
      });
    }
  };

  return (
    <div className="adminContainer">
      <button onClick={Reset} >
        Reset
      </button>
      <input
        type="Number"
        value={maxi}
        onChange={(e) => setMaxi(e.target.value)}
        placeholder="Insert Pause Max ! "
        min="1"
      ></input>
      <button onClick={UpdateMax} >
        Max
      </button>
      <button onClick={isOpen} >
        {users.group.isOpen === 1 ? "Fermé " : "Ouvrir "}
        les pauses
      </button>
    </div>
  );
};
