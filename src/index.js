import React from 'react';
import './index.css';
import App from './App';

import { BrowserRouter, Routes,Route } from "react-router-dom";

// const root = ReactDOM.createRoot(document.getElementById('root'));
// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={ <App /> }>
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('root')
// );
import { createRoot } from "react-dom/client";
// import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<App />);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
