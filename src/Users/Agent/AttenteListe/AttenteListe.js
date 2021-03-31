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
            width: "100px",
            cellStyle: {
              backgroundColor: "#e6e6ff",
              textAlign: "center",
            },
            // defaultGroupSort:'asc'
          },
          {
            title: "Pseudo",
            field: "pseudo",
            cellStyle: {
              textAlign: "center",
            },
          },
        ]}
        style={{
          width: "100%",
          tableLayout: "fixed",
          borderRadius: "20px",
        }}
        options={{
          headerStyle: {
            backgroundColor: "#154c79",
            color: "#ffffff",
            textAlign: "center",
            fontWeight: "bold",
            position: "sticky",
          },
          maxBodyHeight: "300px",
          minBodyHeight: "300px",
          rowStyle: (rowData) => {
            // console.log(rowData)
            if (rowData.notif === 1) {
              return { color: "#ff0000" };
            } else if (rowData.awaiting === 1) {
              return { color: "#DAA520" };
            }
            return { color: "#006400" };
          },
          search: false,
          paging: false,
          // exportButton: true,
          // exportAllData: true,
        }}
      />
    </div>
  );
};

export default AttenteListe;
