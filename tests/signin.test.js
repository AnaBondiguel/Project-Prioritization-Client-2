import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import SignIn from '../src/components/SignIn';

// Mock jest and set the type
jest.mock('axios');

test('loads and displays greeting', async () => {
  axios.post.mockResolvedValueOnce({
    user: {},
    token: 'some string',
  });

  // ARRANGE
  render(<SignIn />)

  // ACT
  console.log(screen.getByText('Sign In'))

  // ASSERT
  
})
