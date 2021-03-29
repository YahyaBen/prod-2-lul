import axios from "axios";

const NotorietyTime = "http://recrutement.notoriety-group.com/date.php";

const service = axios.create({
  baseURL: "http://192.168.1.56/breaktool/api",
  delayed: true,
});
async function currTime() {
  var Time = await axios.get(NotorietyTime).then((e) => {
    return e;
  });
  return Time.data;
}
async function getUser(id) {
  return await service({
    method: "post",
    url: "/user/globalData?id=" + id,
  });
}
async function getUsers() {
  return await service({
    method: "post",
    url: "/user/getAdminData",
  });
}
async function demandeP(id, gId) {
  return service({
    method: "post",
    url: "/user/demandePause?userID=" + id + "&groupID=" + gId,
  });
}
async function accepterP(id, gId) {
  return service({
    method: "post",
    url: "/user/startPause?userID=" + id + "&groupID=" + gId,
  });
}
async function arreterP(id, gId) {
  return service({
    method: "post",
    url: "/user/finichPause?userID=" + id + "&groupID=" + gId,
  });
}
async function resetP(gId) {
  return service({
    method: "post",
    url: "/user/resetPauses?groupID=" + gId,
  });
}
async function depasserP(id, gId) {
  return service({
    method: "post",
    url: "/user/passPause?userID=" + id + "&groupID=" + gId,
  });
}
async function updateMax(id, gId, max) {
  return service({
    method: "post",
    url: "/user/updateMax?userID=" + id + "&groupID=" + gId + "&max=" + max,
  });
}
async function updateEtat(isOpen, gId) {
  return service({
    method: "post",
    url: "/user/updateEtat?groupID=" + gId + "&isOpen=" + isOpen,
  });
}
async function getRank(isOpen, gId) {
  return service({
    method: "post",
    url: "/user/updateEtat?groupID=" + gId + "&isOpen=" + isOpen,
  });
}
function dechifree(id) {
  return id;
}
async function awaitUser(id) {
  return service({
    method: "post",
    url: "/user/awaitPause?userID=" + id,
  });
}
export {
  currTime,
  getUser,
  demandeP,
  accepterP,
  arreterP,
  resetP,
  depasserP,
  updateMax,
  updateEtat,
  getUsers,
  dechifree,
  getRank,
  awaitUser,
};
