"use client";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";

const NavBar = () => {
  const pathName = usePathname();

  return (
    <Navbar bg="primary" variant="dark" sticky="top" expand="sm" collapseOnSelect>
      <Container>
        <Navbar.Brand href="/" as={Link}>
          Next.js 13.4 Image Gallery Exhibition!
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav>
            <Nav.Link as={Link} href="/static" active={pathName === "/static"}>
              Static Fetching
            </Nav.Link>
            <Nav.Link as={Link} href="/dynamic" active={pathName === "/dynamic"}>
              Dynamic Fetching
            </Nav.Link>
            <NavDropdown title="Topics" id="topics-dropdown">
              <NavDropdown.Item as={Link} href="/topics/fitness">
                Fitness
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/topics/coding">
                Coding
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/topics/health">
                Health
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} href="/search" active={pathName === "/search"}>
              Search
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
