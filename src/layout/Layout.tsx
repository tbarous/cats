import {useAppSelector} from "../hooks/useRedux";
import styled from "styled-components";
import {Container} from "react-bootstrap";
import React, {FunctionComponent, ReactElement} from "react";
import Loader from "../components/Loader";
import {BasicComponentProps} from "../types";
import Navbar from "../components/Navbar";

const Main = styled.main`
  margin-top: 2rem;
`;

const Layout: FunctionComponent<BasicComponentProps> = (props: BasicComponentProps): ReactElement => {
    const {children} = props;

    const {loading} = useAppSelector((state) => state.app);

    return (
        <>
            <Navbar/>

            <Main>
                <Container>
                    {children}
                </Container>
            </Main>

            {loading && <Loader/>}
        </>
    )
}

export default Layout;