import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CharSelect from '../pages/charSelect';
import Victory from '../pages/victory';
import Board from '../pages/board';
import Layout from '../components/layout';
import Header from '../components/header';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
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
