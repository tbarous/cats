import styled from "styled-components";

const Header = styled.h1`
  font-size: 24px;
  font-weight: bold;
  font-family: ${p => p.theme.fontFamily.primary};
  padding: 1rem 0;
`;

export default Header;