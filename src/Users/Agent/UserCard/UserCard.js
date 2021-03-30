import React, { useState, useEffect } from "react";
import { demandeP, arreterP } from "../../../tools/axios";
import "./style/style.css";

const UserCard = ({ user, refrech }) => {
  const [data, setdata] = useState(user);

  //////////Gestion affichage button//////////////
  ////////////////////////////////////////////////
  const [btnDemande, setbtnDemande] = useState(
    data.pauses.filter((e) => e.userID === data.user.id).length
  );

  const [btnFinish, setbtnFinish] = useState(
    data.pauses.filter((e) => e.userID === data.user.id && e.etat === 1).length
  );
  ////////////////////////////////////
  ///////////////////////////////////
  const demandePause = () => {
    // create pause
    // ranking
    // date demande
    demandeP(data.user.id, data.user.groupID).then((e) => {
      refrech(data.user.id);
    });
  };

  const arreterPause = () => {
    //update dateFin
    //update etat
    arreterP(data.user.id, data.user.groupID).then((e) => {
      refrech(user.user.id);
    });
  };

  useEffect(() => {
    if (user !== 0) {
      setdata(user);
    }
    return () => {};
  }, [user]);

  return (
    <>
      <div className="userCardContainer">
        <div className="field">
          <p>
            Pseudo : <span>{data.user.Pseudo}</span>
          </p>
        </div>
        <div className="field">
          <p>
            Groupe : <span>{data.group.label}</span>
          </p>
        </div>
        <div className="field">
          <p>
            Max : <span>{data.group.max}</span>
          </p>
        </div>
        <div className="field">
          <p>
            Etat de pause :{" "}
            <span>{data.group.isOpen ? "ouvert" : "ferme"}</span>
          </p>
        </div>
      </div>
      <div>
        {btnDemande === 0 ? (
          <button className="demanderPause" onClick={demandePause}>
            Demander la pause
          </button>
        ) : (
          ""
        )}
        {btnFinish === 1 ? (
          <button className="arreterPause" onClick={arreterPause}>
            Arreter la pause
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default UserCard;
