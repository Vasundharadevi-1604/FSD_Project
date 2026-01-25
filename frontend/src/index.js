// // frontend/src/index.js
// // import React from 'react';
// // import ReactDOM from 'react-dom/client';
// // import App from './App';
// // import { BrowserRouter } from 'react-router-dom';

// // const root = ReactDOM.createRoot(document.getElementById('root'));
// // root.render(
// //   <React.StrictMode>
// //   <BrowserRouter>
// //     <App />
// //   </BrowserRouter>
// //   </React.StrictMode>
// // );
// import React from "react";
// import ReactDOM from "react-dom/client";
// import Root from "./router"; // ✅ Import the router setup
// import "./index.css";
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';
// import { AuthProvider } from "./context/AuthContext";
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   // <React.StrictMode>
//   <BrowserRouter>
//   <AuthProvider>
//     <App />
//     </AuthProvider>
//     </BrowserRouter>
// );
import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import Root from "./router"; // or <App /> if you're using router.js setup

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Root />
    </AuthProvider>
  </React.StrictMode>
);
