import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);

  // regExp search is not working for now with linkedom (probably jest-environment-linkedom issue, maybe getRootNode?)
  //expect(screen.getByText(/learn react/i)).toBeInTheDocument();

  expect(screen.getByText('Learn React')).toBeInTheDocument();
});
