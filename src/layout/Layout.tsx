import {useAppSelector} from "../hooks/useRedux";
import styled from "styled-components";
import {Container} from "react-bootstrap";
import React, {FunctionComponent, ReactElement, useEffect, useRef} from "react";
import Loader from "../components/Loader";
import {BasicComponentProps} from "../types";
import Navbar from "../components/Navbar";
import {useDispatch} from "react-redux";
import {setNotification} from "../store/slices/AppSlice";

const Main = styled.main`
  margin-top: 2rem;
  padding-bottom: 5rem;
`;

const Notification = styled.div`
  position: fixed;
  bottom: 0;
  background: green;
  color: white;
  width: 100%;
  padding: 1rem 0;
  text-align: center;
  z-index: 9999999999999999999999;
  font-family: ${p => p.theme.fontFamily.primary};
  font-weight: bold;
`;

const Layout: FunctionComponent<BasicComponentProps> = (props: BasicComponentProps): ReactElement => {
    const {children} = props;

    const dispatch = useDispatch();

    const {loading, notification} = useAppSelector((state) => state.app);

    const timeoutRef = useRef<any>();

    useEffect(() => {
        clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            dispatch(setNotification(""));
        }, 3000)

        return () => clearTimeout(timeoutRef.current);
    }, [notification])

    return (
        <>
            <Navbar/>

            <Main>
                <Container>
                    {children}
                </Container>
            </Main>

            {loading && <Loader/>}

            {notification && <Notification>{notification}</Notification>}
        </>
    )
}

export default Layout;