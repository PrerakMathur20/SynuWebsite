import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonRoot } from '@tokis/react';
import type { ButtonRootProps } from '@tokis/react';

// Typed wrapper for ButtonRoot used as a React Router Link
type NavButtonProps = ButtonRootProps & { to: string };

export const NavButton = React.forwardRef<HTMLButtonElement, NavButtonProps>(
  ({ to, ...props }, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <ButtonRoot ref={ref} as={Link} {...({ to } as any)} {...props} />;
  }
);
NavButton.displayName = 'NavButton';
