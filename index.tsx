
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UAEFoodAtlas from './pages/UAEFoodAtlas';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const RootApp = window.location.pathname.replace(/\/+$/, '') === '/food-atlas' ? UAEFoodAtlas : App;

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);
