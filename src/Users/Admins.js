import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { getUser, getUsers, dechifree } from "../tools/axios";
import { AdminCard } from "./Admin/AdminCard/AdminCard";
import AttenteListe from "./Agent/AttenteListe/AttenteListe";
import PauseListe from "./Agent/PauseListe/PauseListe";
import './style/styleAdmins.css'

const Admins = (A) => {
  const [data, setdata] = useState(0);
  const [Users, setUsers] = useState(0);

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
    getUsers().then((e) => {
      setUsers(e);
    });
    return 1;
  };

  useEffect(() => {
    refrech(A.match.params.ID);
    var timer = setInterval(() => {
      refrech(A.match.params.ID);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [A.match.params.ID]);

  try {
    return (
      <div className="adminGrpContainer">
        {data.user.typeID === 2 ? (
          <div>
            {data !== 0 && Users !== 0 ? (
              <>
                {Users.data.data.map((e) => (
                  <div className="groupContainer" key={e.group.label}>
                    <AdminCard users={e} data={data} refrech={refrech} />
                    <AttenteListe user={e.dataGroups} />
                    <PauseListe user={e.dataGroups} />
                  </div>
                ))}
              </>
            ) : (
              "Refresh"
            )}
          </div>
        ) : (
          A.history.push("/Error")
        )}
      </div>
    );
  } catch (error) {
    return <div className="userCatchContainer">Refresh please wait ...</div>;
  }
};

export default withRouter(Admins);
