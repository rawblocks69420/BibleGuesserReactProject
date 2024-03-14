import * as React from "react";
import * as ReactDOM from "react-dom/client"
import { useState } from "react";
import  bibleData  from "./bibleData.json"
import "./fums"
import App from "./App"




const root = ReactDOM.createRoot(
    document.getElementById( "root" ));
root.render(<App  />);
