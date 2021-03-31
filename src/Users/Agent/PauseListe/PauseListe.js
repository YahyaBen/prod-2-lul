import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import './style/style.css'

const PauseListe = ({ user, refrech }) => {
  const [data, setdata] = useState([]);

  const secToMin = (Diff) => {
    var Minutes = Math.floor(Diff / 60);
    var Seconds = Diff % 60;
    return Minutes + ":" + (Seconds < 10 ? "0" : "") + Seconds;
  };

  const addSec = (list) => {
    var temp = [...list];
    return temp.map((e) => {
      return {
        ...e,
        diff: e.diff + 1,
        Chrono: secToMin(e.diff + 1),
      };
    });
  };

  var fixdata = (data) => {
    return data.pauses
      .filter((e) => e.etat === 1)
      .map((e) => {
        var dif = user.time - e.datePause;
        return { ...e, Chrono: secToMin(dif), diff: dif };
      });
  };

  useEffect(() => {
    if (user !== 0) {
      user.pauses = fixdata(user);
      setdata(user.pauses);
      var timer = setInterval(() => {
        user.pauses = addSec(user.pauses);
        setdata(user.pauses);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, []);

  return (
    <div className="tablePause">
      <MaterialTable
        title="Pauses en cours"
        data={data}
        columns={[
          {
            title: "Ranking",
            field: "ranking",
            cellStyle: {
              backgroundColor: "#e6e6ff",
              textAlign: "center",
            },
          },
          {
            title: "Pseudo",
            field: "pseudo",
            cellStyle: {
              textAlign: "center",
            },
          },
          {
            title: "Chrono",
            field: "Chrono", // a definir
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
            width: "22px",
            position: "sticky",
          },
          maxBodyHeight: "300px",
          minBodyHeight: "300px",
          rowStyle: (rowData) => {
            if (rowData.etat === 1) {
              if (rowData.diff >= 900) {
                return { backgroundColor: "#ffa3a3" };
              }
              return { backgroundColor: "#C1E7C3" };
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

export default PauseListe;
