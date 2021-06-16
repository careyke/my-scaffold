import React, { FC } from "react";
import { hot } from "react-hot-loader";

import classes from "./App.less";

const App: FC = () => {
  return <div className={classes.container}>Hello React Template Webpack!</div>;
};

export default hot(module)(App);
