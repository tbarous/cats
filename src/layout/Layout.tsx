import {useAppSelector} from "../hooks/useRedux";
import styled from "styled-components";
import {Container} from "react-bootstrap";
import React, {FunctionComponent, ReactElement} from "react";
import Loader from "../components/Loader";
import {BasicComponentProps} from "../types";

const ContainerWrapper = styled(Container)`
  padding: 2rem;
`;

const Layout: FunctionComponent<BasicComponentProps> = (props: BasicComponentProps): ReactElement => {
    const {children} = props;

    const {loading} = useAppSelector((state) => state.app);

    return (
        <>
            <ContainerWrapper>
                {children}
            </ContainerWrapper>

            {loading && <Loader/>}
        </>
    )
}

export default Layout;