import { render, screen } from '@testing-library/react';
import MainAside from './MainAside';

describe('MainAside', () => {
  it('renders an image with correct attributes', () => {
    render(<MainAside />);
    const image = screen.getByAltText('Pavel');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('width', '200');
    expect(image).toHaveAttribute('height', '200');
  });
  
  it('Image uses NextImage image optimizer', () => {
    render(<MainAside />);
    const image = screen.getByAltText('Pavel');
    const src = image.getAttribute('src');

    expect(image).toBeInTheDocument();
    expect(src).toMatch(/\/_next\/image\?url=%2Fheadshot_1_1\.jpg&w=640&q=75/i);
  });

  it('renders a list of links', () => {
    render(<MainAside />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(5);
    expect(links[0]).toHaveTextContent('Home');
    expect(links[1]).toHaveTextContent('Portfolio');
    expect(links[2]).toHaveTextContent('GitHub');
    expect(links[3]).toHaveTextContent('LinkedIn');
    expect(links[1]).toHaveAttribute('href', 'https://pavelaparcana.com');
    expect(links[2]).toHaveAttribute('href', 'https://github.com/aparcanapavel');
    expect(links[3]).toHaveAttribute('href', 'https://www.linkedin.com/in/pavel-aparcana');
  });

  it('renders a paragraph with a link to the NASA API', () => {
    render(<MainAside />);
    const paragraph = screen.getByText('Source:');
    const link = screen.getByText('NASA API');
    expect(paragraph).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://api.nasa.gov/');
  });
});