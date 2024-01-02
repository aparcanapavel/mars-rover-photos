/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { act } from 'react-dom/test-utils';

describe('Header component', () => {
  test('renders an element with test id "header"', () => {
    render(<Header isMobile={false} />);
    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();
  });

  test('renders the title "Mars RoverGram"', () => {
    render(<Header isMobile={false} />);
    const titleElement = screen.getByText('Mars RoverGram');
    expect(titleElement).toBeInTheDocument();
  });

  test('does not render the menu button if isMobile is false', () => {
    render(<Header isMobile={false} />);
    const buttonElement = screen.queryByLabelText('Open Options Menu');

    expect(buttonElement).toBeNull();
  });

  test('renders the button with "Open Options Menu" aria label if isMobile is true', () => {
    render(<Header isMobile={true} />);
    const buttonElement = screen.getByLabelText('Open Options Menu');
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders the menu items when the button is clicked', async () => {
    render(<Header isMobile={true} />);
    const buttonElement = screen.getByLabelText('Open Options Menu');

    await act(async () => {
      fireEvent.click(buttonElement);
    });

    const homeLink = screen.getByText('Home');
    const portfolioLink = screen.getByText('Portfolio');
    const githubLink = screen.getByText('GitHub');
    const linkedinLink = screen.getByText('LinkedIn');

    expect(homeLink.getAttribute('href')).toBe('/');
    expect(homeLink.getAttribute('target')).toBeNull();

    expect(portfolioLink.getAttribute('href')).toBe('https://pavelaparcana.com');
    expect(portfolioLink.getAttribute('target')).toBe('_blank');

    expect(githubLink.getAttribute('href')).toBe('https://github.com/aparcanapavel');
    expect(githubLink.getAttribute('target')).toBe('_blank');

    expect(linkedinLink.getAttribute('href')).toBe('https://www.linkedin.com/in/pavel-aparcana');
    expect(linkedinLink.getAttribute('target')).toBe('_blank');
  });

  test('does not render the menu items by default even if isMobile is true', () => {
    render(<Header isMobile={true} />);
    const homeLink = screen.queryByText('Home');
    const portfolioLink = screen.queryByText('Portfolio');
    const githubLink = screen.queryByText('GitHub');
    const linkedinLink = screen.queryByText('LinkedIn');

    expect(homeLink).toBeNull();
    expect(portfolioLink).toBeNull();
    expect(githubLink).toBeNull();
    expect(linkedinLink).toBeNull();
  });
});