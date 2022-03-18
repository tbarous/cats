import React, {FunctionComponent, ReactElement} from "react";
import {useState} from "react";
import styled from "styled-components";
import {BasicComponentProps} from "../types";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Img = styled.img<{ clickable?: boolean, rounded?: boolean }>`
  width: 100%;
  height: 100%;
  cursor: ${p => p.clickable ? "pointer" : "auto"};
  border-radius: ${p => p.rounded ? "8px" : "0"};
  object-fit: contain;
  z-index: 9;
`

const Placeholder = styled.div<{ clickable?: boolean, rounded?: boolean }>`
  width: 100%;
  height: 100%;
  background: lightgray;
  position: absolute;
  border-radius: ${p => p.rounded ? "8px" : "0"};
  top: 0;
  left: 0;
  z-index: -1;
`;

interface Props extends BasicComponentProps {
    src: string,
    clickable?: boolean,
    rounded?: boolean
}

const Image: FunctionComponent<Props> = (props: Props): ReactElement => {
    const {clickable, rounded} = props;

    const [loaded, setLoaded] = useState(false);

    return (
        <Wrapper
            className={props.className}
        >
            <Img
                clickable={clickable}
                rounded={rounded}
                src={props.src}
                alt=""
                onLoad={() => setLoaded(true)}
            />

            <Placeholder
                rounded={rounded}
            />
        </Wrapper>
    );
}

export default Image;