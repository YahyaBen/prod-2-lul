import React, { useState, useEffect } from "react";
import { demandeP, arreterP } from "../../../tools/axios";
import "./style/style.css";

const UserCard = ({ user, refrech }) => {
  const [data, setdata] = useState(user);

  //////////Gestion affichage button//////////////

  const [btnDemande, setbtnDemande] = useState(
    data.pauses.filter((e) => e.userID === data.user.id).length
  );

  const [btnFinish, setbtnFinish] = useState(
    data.pauses.filter((e) => e.userID === data.user.id && e.etat === 1).length
  );

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
          Pseudo <br /> <span>{data.user.Pseudo}</span>
        </div>
        <div className="field">
          Groupe <br/> <span>{data.group.label}</span>
        </div>
        <div className="field">
          Max <br /> <span>{data.group.max}</span>
        </div>
        <div className="field">
          Etat de pause <br />
          <span>{data.group.isOpen ? " ouvert " : " ferme "}</span>
        </div>
        <div className="field">
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
      </div>
    </>
  );
};

export default UserCard;
