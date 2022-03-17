import styled from "styled-components";
import Theme, {ThemeInterface} from "../theme/Theme";
import {StyledProps} from "../types";

export enum Variations {
    primary = "primary",
    secondary = "secondary"
}

interface Props extends StyledProps {
    variation?: Variations
}

function getBackgroundColor(props: Props) {
    const {theme, variation} = props;

    if (variation === Variations.secondary) {
        return theme.colors.secondary;
    }

    return theme.colors.primary;
}

const Button = styled.button<Props>`
  width: 100%;
  background-color: ${getBackgroundColor};
`;

export default Button;