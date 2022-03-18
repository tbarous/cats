import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import store from "./store/store";
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router-dom";
import {ThemeProvider} from "styled-components";
import Theme from "./theme/Theme";
import GlobalStyle from "./theme/GlobalStyle";
import Breeds from "./pages/Breeds";
import Favorites from "./pages/Favorites";
import 'bootstrap/dist/css/bootstrap.min.css';
import Images from "./pages/Images";

ReactDOM.render(
    <ThemeProvider theme={Theme}>
        <GlobalStyle/>

        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Images/>}/>
                    <Route path="/breeds" element={<Breeds/>}/>
                    <Route path="/favorites" element={<Favorites/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    </ThemeProvider>,
    document.getElementById("root")
);