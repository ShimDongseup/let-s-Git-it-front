import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFound from './NotFound';

describe('<NotFound3 />', () => {
  it('NotFound render', () => {
    render(<NotFound />);
  });

  it('404 Page text render', () => {
    render(<NotFound />);
    expect(screen.getByText('404 Page Not Found')).toBeInTheDocument();
  });
});
