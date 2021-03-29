import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import './style/style.css'
const AttenteListe = ({ user, refrech }) => {
  const [dataUser, setdataUser] = useState(user);

  useEffect(() => {
    if (user !== 0) {
      setdataUser(user);
      return () => {};
    }
  }, [user]);
  return (
    <div className="tableAttente">
      <MaterialTable
        title="Liste d'attente"
        data={dataUser.pauses.filter((e) => e.etat === 0)}
        columns={[
          {
            title: "Ranking",
            field: "ranking",
          },
          {
            title: "Pseudo",
            field: "pseudo",
            width: "150px",
          },
        ]}
        options={{
          headerStyle: {
            backgroundColor: "#696a6e",
            color: "#FFF",
            fontSize: "17px",
            textAlign: "center",
            fontWeight: "bold",
          },
          rowStyle: (rowData) => {
            // console.log(rowData)
             if (rowData.notif === 1) {
              return { backgroundColor: "#ff0000" 
            };
             } else 
            if (rowData.awaiting === 1) {
              return { backgroundColor: "#E4E5B4" };
            }
            return { backgroundColor: "#DAE9ED" };
          },
          search: false,
          paging: false,
        }}
      />
    </div>
  );
};

export default AttenteListe;
