import {createRoot} from 'react-dom/client';
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

const comp = <App />;
const root = createRoot(document.getElementById("root") as Element);
root.render(comp);