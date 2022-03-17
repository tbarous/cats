import React, {FunctionComponent, ReactElement} from "react";
import {BasicComponentProps} from "../types";

interface Props extends BasicComponentProps {
    onClick: any
}

const HeartEmpty: FunctionComponent<Props> = (props: Props): ReactElement => {
    const {className, onClick} = props;

    return (
        <svg onClick={onClick} className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
                d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM168 232C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H168z"/>
        </svg>
    )
}

export default HeartEmpty;


