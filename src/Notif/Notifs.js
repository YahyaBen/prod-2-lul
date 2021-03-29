import React, { useEffect, useState } from "react";
import { accepterP, awaitUser, depasserP } from "../tools/axios";
import "./style.css";

const Notifs = ({ user, refrech }) => {
  const [data, setdata] = useState(0);

  //////////Gestion affichage button//////////////
  ////////////////////////////////////////////////
  const [btnPatienter, setbtnPatienter] = useState(
    user.pauses.filter((e) => e.userID === user.user.id && e.awaiting === 1)
      .length
  );

  const accepterPause = () => {
    //update etat pause =>
    //update datePause
    //notif off
    accepterP(user.user.id, user.user.groupID)
      .then((e) => {
        refrech(user.user.id);
      })
      .catch((e) => console.log(e));
  };

  const depasserPause = () => {
    //update ranking
    //update notif
    //update notifdate
    depasserP(user.user.id, user.user.groupID)
      .then((e) => {
        refrech(user.user.id);
      })
      .catch((e) => console.log(e));
  };
  const patienterPause = () => {
    awaitUser(user.user.id).then((e) => {
      refrech(user.user.id);
    });
  };

  const secToMin = (Diff) => {
    var Minutes = Math.floor(Diff / 60);
    var Seconds = Diff % 60;
    return Minutes + ":" + (Seconds < 10 ? "0" : "") + Seconds;
  };

  const addSec = (data) => {
    var temp = data;
    return {
      ...temp,
      diff: temp.diff + 1,
      Chrono: secToMin(temp.diff + 1),
    };
  };

  var fixdata = (data) => {
    var dif = user.time - data.user.notifDate;
    return { ...data.user, Chrono: secToMin(dif), diff: dif };
  };

  useEffect(() => {
    if (user !== 0) {
      user.user = fixdata(user);
      setdata(user.user);
      var timer = setInterval(() => {
        user.user = addSec(user.user);
        setdata(user.user);
        ///////////////////////
        //////DEPPASSER////////
        ///////////////////////
        if (user.user.diff >= 120) {
          if (btnPatienter === 0) {
            // another verfification awaiting here !!!
            awaitUser(user.user.id).then((e) => {
              refrech(user.user.id);
            });
          } else depasserPause();
        }
        //console.log(user.user.diff);
        ///////////////////////
        ///////////////////////
        ///////////////////////
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [user]);

  return (
    <>
      <div className="notifContainer">
        <div className="notifHeader">
          <p>Voulez-vous partir en pause ? {data.Chrono}</p>
          <button onClick={accepterPause}>Accepter</button>
          <button onClick={depasserPause}>Depasser</button>

          {btnPatienter === 0 ? (
            <>
              <button onClick={patienterPause}>Patienter 2min</button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Notifs;
