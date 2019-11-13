import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CharSelect from "../pages/charSelect";
import Victory from "../pages/victory";
import Board from "../pages/board";
import Layout from "../components/layout";

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Layout>
        <Switch>
          <Route path="/" component={CharSelect} exact={true} />
          <Route path="/board" component={Board} />
          <Route path="/victory" component={Victory} />
        </Switch>
      </Layout>
    </div>
  </BrowserRouter>
);

export default AppRouter;
