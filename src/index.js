// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';

// import App1 from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App1 />
//     </BrowserRouter>
//   </React.StrictMode>,
// );


import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'leaflet/dist/leaflet.css'
createRoot(document.getElementById("root")).render(<App />);