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

const Navbar = () => {
    return (
        <Nav>
            <Container>
                <Row>
                    <Col xs={1}>
                        <Link to="/">Cats</Link>
                    </Col>

                    <Col xs={1}>
                        <Link to="/breeds">Breeds</Link>
                    </Col>

                    <Col xs={1}>
                        <Link to="/favorites">Favorites</Link>
                    </Col>
                </Row>
            </Container>
        </Nav>
    )
}

export default Navbar;