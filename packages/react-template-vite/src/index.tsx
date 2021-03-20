import React from "react";
import ReactDOM from "react-dom";

import { add } from "@/utils";
import classes from "./index.module.less";

const root = document.querySelector("#root");

ReactDOM.render(
  <div className={classes.container}>Hello Vite {add(1, 2)}</div>,
  root
);
