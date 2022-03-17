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
  z-index: 9999;
`;

const Inner = styled.div`
  border-radius: 8px;
  width: 400px;
  background: white;
  position: relative;
  z-index: 9999;
`;

const Close = styled.div`
  position: absolute;
  right: .5rem;
  top: .5rem;
  cursor: pointer;
  color: white;
  font-weight: bold;
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

                <Close onClick={onClose}>&times;</Close>
            </Inner>
        </Wrapper>
    )
}

export default Modal;