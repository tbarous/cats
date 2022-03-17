import React from "react";
import {useState} from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  background: lightgray;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
`

const Image = (props) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <Wrapper className={props.className}>
            <Img src={props.src} alt="" onLoad={() => setLoaded(true)}/>

            {!loaded && <Placeholder/>}
        </Wrapper>
    );
}

export default Image;