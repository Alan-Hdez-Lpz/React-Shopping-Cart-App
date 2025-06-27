import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock react-router's Link component for styled-components
jest.mock('react-router', () => ({
  Link: (props) => <a {...props} />,
}));

// Import the styled components after mocking
import {
  BackButton,
  HeaderWrapper,
  ProductCardWrapper,
} from '../styles'; // Adjust path if needed

describe('Styled Components', () => {
  test('BackButton renders as a link with correct styles and text', () => {
    const { getByText } = render(<BackButton to="/home">Go Home</BackButton>);
    const linkElement = getByText(/go home/i);

    expect(linkElement).toBeInTheDocument();
    expect(linkElement.tagName).toBe('A');
    expect(linkElement).toHaveStyle('color: #007bff');
  });

  test('HeaderWrapper renders with correct background color', () => {
    const { container } = render(<HeaderWrapper>Header Content</HeaderWrapper>);
    expect(container.firstChild).toHaveStyle('background: #333');
  });

  test('ProductCardWrapper renders with border and padding', () => {
    const { container } = render(<ProductCardWrapper>Product</ProductCardWrapper>);
    expect(container.firstChild).toHaveStyle('border: 1px solid #ccc');
    expect(container.firstChild).toHaveStyle('padding: 1rem');
  });
});
