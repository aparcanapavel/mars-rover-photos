import '../utils/matchMedia.mock';
import { render, screen } from '@testing-library/react';
import Layout from './Layout';
import * as meduaQueryHook from '../utils/useMediaQuery';
jest.mock('../utils/useMediaQuery');

describe('Layout component', () => {
  it('renders a header with test id "header"', () => {
    render(<Layout isMobile={false}><p>test</p></Layout>);
    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();
  });

  test('renders a stage with test id "stage"', () => {
    render(<Layout isMobile={false}><p>test</p></Layout>);
    const stageElement = screen.getByTestId('stage');
    expect(stageElement).toBeInTheDocument();
  });
  
  it('renders a stage with the children', () => {
    render(<Layout isMobile={false}><p>test</p></Layout>);
    const childElement = screen.getByText('test');
    expect(childElement).toBeInTheDocument();
  });

  it('renders the main aside with test id "aside-details" if isMobile prop is false', () => {
    render(<Layout isMobile={false}><p>test</p></Layout>);
    const asideElement = screen.getByTestId('aside-details');
    expect(asideElement).toBeInTheDocument();
  });

  it('does not render the main aside if isMobile prop is true', () => {
    const useMediaQuerySpy = jest.spyOn(meduaQueryHook, 'useMediaQuery')
      .mockImplementation(() => true);

    render(<Layout isMobile={true}><p>test</p></Layout>);
    const asideElement = screen.queryByTestId('aside-details');
    expect(asideElement).toBeNull();
    expect(useMediaQuerySpy).toHaveBeenCalled();
  });
});