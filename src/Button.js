import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem;
  margin: 0 1rem;
  border: 2px solid #fff;
  border-radius: 3px;
  align-self: center;
  cursor: pointer;
  background: var(--btn-color, #bada55);

  ${(props) =>
    props.variant === "delete" &&
    `
    background: #f00736;
  `}
`;

export default function Button({ children, func, variant }) {
  return (
    <StyledButton onClick={func} variant={variant}>
      {children}
    </StyledButton>
  );
}
