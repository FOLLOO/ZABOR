import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { OverlayContextProvider } from './context/OverlayContext'
import { Provider } from 'react-redux'
import store from './redux/store'
import { TagsProvider } from './context/TagsContext'
import {Helmet} from "react-helmet";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Helmet>
          <meta charSet="utf-8"/>
          <title>ZABOR</title>
          <meta name="description" content="Раскройте ваш творческий потенциал и поделитесь уникальными историями с миром! На нашем сайте мы, безусловно, помогаем авторам раскрыть свой потенциал"/>
          <meta name="keywords" content="HTML, CSS, JavaScript"/>
          <meta name="author" content="Sairommef"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Helmet>
      <OverlayContextProvider>
          <Provider store={store}>
              <TagsProvider>
                  <App/>
              </TagsProvider>
          </Provider>
      </OverlayContextProvider>
  </React.StrictMode>
);
// reportWebVitals(console.log)
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
