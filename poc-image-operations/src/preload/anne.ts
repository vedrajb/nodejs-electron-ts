import { ipcRenderer } from "electron";

const requestData = (args: string) => ipcRenderer.invoke("get-data", args);
const resizeImage = (args: string) => ipcRenderer.invoke("resize-image", args);

export const anneAPI = {
  requestData,
  resizeImage
};
