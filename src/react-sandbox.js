import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import App from './components/App';
import NotFound from './components/NotFound';

const Router = () => (
  <BrowserRouter>
    <div>
      <Match exactly pattern='/' component={App} />
      <Miss component={NotFound} />
    </div>
  </BrowserRouter>
);

render(<Router />, document.getElementById('app'));
