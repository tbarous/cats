import React, {useRef, useState} from "react";
import {FunctionComponent, ReactElement} from "react";
import styled from "styled-components";
import {BasicComponentProps} from "../types";
import useOnClickOutside from "../hooks/useOnClickOutside";
import Times from "../icons/Times";

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
  width: 100%;
  max-width: 100%;
  height: 100vh;
  max-height: 100%;
  border-radius: 8px;
  overflow: auto;
  background: white;
  position: relative;
  z-index: 9999;

  @media screen and (min-width: 1024px) {
    height: 400px;
    width: 600px;
  }
`;

const Close = styled(Times)`
  position: absolute;
  right: .5rem;
  top: .5rem;
  cursor: pointer;
  color: white;
  font-weight: bold;
  width: 30px;
  height: 30px;
  z-index: 99999999999;
`;

interface Props extends BasicComponentProps {
    onClose: () => void
}

const Modal: FunctionComponent<Props> = (props: Props): ReactElement => {
    const {children, onClose} = props;

    const ref = useRef<any>();

    useOnClickOutside(ref, () => onClose && onClose())

    return (
        <Wrapper>
            <Inner ref={ref}>
                {children}

                <Close
                    onClick={onClose}
                />
            </Inner>
        </Wrapper>
    )
}

export default Modal;