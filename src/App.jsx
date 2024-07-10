import { useState } from "react";
import "./App.css";
import Picture from "./component/Picture";

function App() {
  const [word, setWord] = useState("");
  const [photos,setPhotos] = useState([])
  


  function searchImage(e){
    e.preventDefault();
    if(!word){
      alert("กรุณาป้อนข้อมูล")
    }else{
      //เรียกใช้ API
      fetchImageFromAPi()
      // console.log(import.meta.env)
    }

  }
  async function fetchImageFromAPi(){
    const url = `${import.meta.env.VITE_API_URL}?page=1&query=${word}&client_id=${import.meta.env.VITE_API_KEY}&per_page=15`
    const res = await fetch(url)
    const data = await res.json()
    const result = data.results
    if(result.length==0){
      alert("ไม่มีรูปภาพ")
    }else{
      //แสดงรูป
      setPhotos(result)
    }
  }
  return (
    <>
      <h1>ระบบค้นหารูปภาพด้วย API</h1>
      <form onSubmit={searchImage}>
        <input
          type="text"
          placeholder="ป้อนชื่อรูปภาพด้วยการค้นหา"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        ></input>
        <button type="submit">ค้นหา</button>
      </form>
      <div className="search-result">
        {photos.map((data,index)=>{
          return <Picture {...data} key={index}/>
        })}
      </div>
    </>
  );
}

export default App;
