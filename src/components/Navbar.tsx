import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {Col, Container, Row} from "react-bootstrap";

const Nav = styled.nav`
  display: flex;
  position: relative;
  width: 100%;
  height: 80px;
  align-items: center;
  background: black;

  a {
    text-decoration: none;
    font-family: ${p => p.theme.fontFamily.primary};
    color: white;
    font-weight: bold;
  }
`;

const L = styled(Link)`
  margin-right: 2rem;
`;

const Navbar = () => {
    return (
        <Nav>
            <Container>
                <div style={{display: "flex"}}>
                    <L to="/">Cats</L>
                    <L to="/breeds">Breeds</L>
                    <L to="/favorites">Favorites</L>
                </div>
            </Container>
        </Nav>
    )
}

export default Navbar;