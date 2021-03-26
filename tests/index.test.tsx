import renderer from "react-test-renderer";
import { render, screen } from '@testing-library/react';
import Index from '../pages/index';

describe('Exemplar-react-test renderer Snapshot test', () => {
  it('renders homepage unchanged', () => {
    const tree = renderer.create(<Index />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Example react testing-library Test', () => {
  it('has our placeholder app', () => {
    render(<Index />);
    expect(screen.queryByText('Welcome to the Placeholder Claim Tracker App')).toBeInTheDocument();
  });
});
