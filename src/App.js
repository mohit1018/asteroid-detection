
import './App.css';
import React, { useState } from "react";
import Neo from './component/Neo';
import LoadingBar from 'react-top-loading-bar'


function App() {
  const [progress,setProgress] = useState(0)
  return (
    <>
     <LoadingBar
        height = {6}
        // color='#f11946'
        color="#000000"
        progress={progress}
        
      />
      <Neo setProgress={setProgress}/>

    </>
  );
}

export default App;
