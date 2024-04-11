import Versions from "./components/Versions";
import electronLogo from "./assets/electron.svg";
import { useState } from "react";

function App(): JSX.Element {
  const ipcHandle = async (): Promise<string> =>
    await window.anne.requestData("Hello");
  const [imageBase64, setImageBase64] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result ? (reader.result as string).replace("data:", "").replace(/^.+,/, "") : '';
        setImageBase64(base64String);
      };
      reader.readAsDataURL(file);
    }
  };
  const sendImage = async () => {
    const response = await window.anne.resizeImage(imageBase64);
    console.log(response); // log the response from the main process
  };
  return (
    <>
      <input type="file" onChange={handleImageChange} />
      <div className="actions">
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={sendImage}>
            Upload Image
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            Send IPC
          </a>
        </div>
      </div>
      <Versions></Versions>
    </>
  );
}

export default App;
