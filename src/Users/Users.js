import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { getUser } from "../tools/axios";
import AttenteListe from "./Agent/AttenteListe/AttenteListe";
import PauseListe from "./Agent/PauseListe/PauseListe";
import UserCard from "./Agent/UserCard/UserCard";
import Notifs from "../Notif/Notifs";
import "./style/styleUsers.css";

const Users = (A) => {
  const [data, setdata] = useState(0);

  const refrech = (id) => {
    getUser(id)
      .then((e) => {
        try {
          setdata(0);
          setdata(e === undefined ? 0 : e.data === undefined ? 0 : e.data);
        } catch (error) {
          setdata(0);
        }
      })
      .catch((e) => {
        setdata(0);
      });

    return 1;
  };

  useEffect(() => {
    refrech(A.match.params.ID);
    var timer = setInterval(() => {
      refrech(A.match.params.ID);
    }, 5000);

    return async () => {
      clearInterval(timer);
    };
  }, [A.match.params.ID]);

  try {
    return (
      <div className="userContainer">
        {data !== 0 ? (
          <>
            <UserCard className="itemsUser" user={data} refrech={refrech} />
            <AttenteListe className="itemsUser" user={data} refrech={refrech} />
            <PauseListe className="itemsUser" user={data} refrech={refrech} />

            {/* Notif comp */}

            {data.user.notif === 1 ? (
              <>
                <Notifs user={data} refrech={refrech} />
              </>
            ) : (
              ""
            )}
          </>
        ) : (
          "Refresh"
        )}
      </div>
    );
  } catch (error) {
    return (
      <div className="userCatchContainer">
        Refresh please wait...{refrech(A.match.params.ID)}
      </div>
    ); 
  }
};

export default withRouter(Users);
