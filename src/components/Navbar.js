import React from "react";
import styled from "styled-components";
import { Box } from "@mui/material";

const NavContainer = styled(Box)`
  height: 10vh;
  background-color: #ff6f61;
  display: flex;
  padding: 0 40px;
  align-items: center;
  justify-content: space-between;
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

const Navbar = () => {
  return (
    <NavContainer>
     Welcome to Recipe Founder
    </NavContainer>
  );
};

export default Navbar;
