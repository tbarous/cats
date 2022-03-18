import styled from "styled-components";
import Text from "./Text";

const StyledLink = styled(Text)`
  font-family: ${p => p.theme.fontFamily.primary};
  cursor: pointer;
`;

export default StyledLink;