import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import store from "./store/store";
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router-dom";
import {ThemeProvider} from "styled-components";
import Theme from "./theme/Theme";
import GlobalStyle from "./components/styled/GlobalStyle";

ReactDOM.render(
    <ThemeProvider theme={Theme}>
        <GlobalStyle/>

        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    </ThemeProvider>,
    document.getElementById("app")
);