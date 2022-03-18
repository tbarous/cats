import styled from "styled-components";
import {StyledProps} from "../../types";

export enum Variations {
    primary = "primary",
    secondary = "secondary"
}

interface Props extends StyledProps {
    variation?: Variations,
    hide: boolean
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
  padding: 1rem;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-family: ${p => p.theme.fontFamily.primary};
  border: none;
  box-shadow: ${p => p.theme.shadow.primary};
  opacity: ${p => p.hide ? '0' : '1'};
  font-weight: bold;
`;

export default Button;