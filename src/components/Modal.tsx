import React, {useRef, useState} from "react";
import {FunctionComponent, ReactElement} from "react";
import styled from "styled-components";
import {BasicComponentProps} from "../types";
import useOnClickOutside from "../hooks/useOnClickOutside";

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
`;

const Inner = styled.div`
  width: 400px;
  background: white;
`;

interface Props extends BasicComponentProps {
    onClose: () => void
}

const Modal: FunctionComponent<Props> = (props: Props): ReactElement => {
    const {children, onClose} = props;

    const ref = useRef();

    useOnClickOutside(ref, () => onClose && onClose())

    return (
        <Wrapper>
            <Inner ref={ref}>
                {children}
            </Inner>
        </Wrapper>
    )
}

export default Modal;