import React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {ElementsTable} from "./components/table/ElementsTable";
import {Provider} from "react-redux";
import store from './store/store'
import {ThresholdInput} from "./components/ThresholdInput";
import {IntervalWidget} from "./components/IntervalWidget";
import {Grid} from "@mui/material";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="control-panel">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <IntervalWidget />
            </Grid>
            <Grid item xs={6}>
              <ThresholdInput />
            </Grid>
          </Grid>
        </div>
        <ElementsTable />
      </div>
    </Provider>
  );
}

export default App;
