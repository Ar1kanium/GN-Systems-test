import React from "react";
import data from './data/flights.json'
import Content from "./components/Content";
import {styles} from "./styles";
import {initializeData} from "./services/services";

function App() {
    const [myData] = React.useState(initializeData(data))



  return (
    <div className={styles.app}>
        <Content data={myData}/>
    </div>
  );
}

export default App;
