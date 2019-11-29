import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CharSelect from '../pages/charSelect';
import Victory from '../pages/victory';
import Board from '../pages/board';
import Layout from '../components/layout';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Layout>
          <Route path="/" component={CharSelect} exact={true} />
          <Route path="/board" component={Board} />
          <Route path="/victory" component={Victory} />
        </Layout>
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
