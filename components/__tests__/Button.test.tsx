import React from 'react'; // Make sure React is imported if you're using JSX
import { render, screen } from '@testing-library/react';
import Button from '../Button'; // Adjust the import path if necessary
import '@testing-library/jest-dom'; // For additional DOM matchers

describe('Button Component', () => {
  // Test case for rendering the Button component
  test('renders Button component with text "Click me"', () => {
    render(<Button />); // Render the Button component

    // Check if the button with the text "Click me" is in the document
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  // Additional test case for button click functionality (optional)
  test('button is clickable', () => {
    render(<Button />);

    const buttonElement = screen.getByText(/click me/i);
    // Simulate a click event if needed
    buttonElement.click();


  });
});
