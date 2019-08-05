import * as React from 'react';
import styled, { css } from 'styled-components';
import { space, SpaceProps, width, WidthProps } from 'styled-system';

const ButtonStyle = css`
  height: 2.5rem;
  padding: 0 2.5rem;

  font-size: 1rem;

  color: black;
  border: 1px solid black;
`;

const Wrapper = styled.button<SpaceProps & WidthProps>`
  ${ButtonStyle};
  ${space};
  ${width};
`;

interface Props extends SpaceProps, WidthProps {
  onClick: () => void;
  label: string;
}

export const Button: React.FC<Props> = ({ label, children, ...rest }) => {
  return (
    <Wrapper aria-label={label} {...rest}>
      {children ? children : label}
    </Wrapper>
  );
};
