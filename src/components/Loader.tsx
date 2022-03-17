import React from "react";
import styled, {css} from "styled-components";
import {keyframes} from "styled-components";

const animation = keyframes`
  0% {
    top: 8px;
    height: 64px;
  }
  50%, 100% {
    top: 24px;
    height: 32px;
  }
`;

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
`;

const Inner = styled.div`
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: red;
  animation: ${animation} 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
`

const First = styled(Inner)`
  left: 8px;
  animation-delay: -0.24s;
`

const Second = styled(Inner)`
  left: 32px;
  animation-delay: -0.12s;
`

const Third = styled(Inner)`
  left: 56px;
  animation-delay: 0;
`

const Loader = (props: any) => {
    return (
        <Wrapper>
            <First/>
            <Second/>
            <Third/>
        </Wrapper>
    )
}

export default Loader;