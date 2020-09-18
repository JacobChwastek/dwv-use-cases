import React from 'react';
import DwvView from "./views/DwvView";
import { Layout } from "./components/common" 

import './App.css';
import 'antd/dist/antd.css';


function App() {
  return (
    <div className="App">
      <Layout 
        content={<DwvView/>}
        />
     
    </div>
  );
}

export default App;
