import { useState } from "react";

export const Qrcode = () => {
    const [img, setImg] =useState("");
    const[loading, setLoading]=useState(false);
    const[qrData,setqrData]=useState("");
    const[qrSize,setqrSize]=useState("");
  
   async function generateQR(){
       setLoading(true);
       try{
        const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
        setImg(url);
       }catch(error){
        console.error("Error generating QR code", error);
       }finally{
        setLoading(false);
       }
    }
    function downloadQR(){
      fetch(img).then((response)=>response.blob())
      .then((blob) => {
        const link=document.createElement("a");
        link.href=URL.createObjectURL(blob);
        link.download="qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }).catch((error) => {
          console.error("Error downloading QR code", error);
      });
    }
  return (
    <div className="app-container">
        <h1>QR CODE GENERATOR</h1>
        {loading && <p>Please wait...</p>}
        {img &&  <img src={img} className="qrimg" />}
        <div>
        <label htmlFor="dataInput" className="input-label">
            Data for QR code :
        </label>
        <input type="text" value={qrData} id="dataInput" placeholder="Enter data for QR Code" 
        onChange={(e) => setqrData(e.target.value)} />

        <label htmlFor="sizeInput" className="input-label">
          Image size (e.g., 150) :
        </label>
        <input type="text" value={qrSize} id="sizeInput" placeholder="Enter Image Size"
         onChange={(e) => setqrSize(e.target.value)} />
        <button className="generate" disabled={loading} onClick={generateQR}>Generate QR Code</button>
        <button className="download" onClick={downloadQR} >Download QR Code</button>
        </div>
        <p className="footer">
            Designed By <a href="https://www.linkedin.com/in/mahalakshmi-t-g">Mahalakshmi</a> 
            </p>
    </div>
  );
}
