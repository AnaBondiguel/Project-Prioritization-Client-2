import {render, screen} from '@testing-library/react';
// import '@testing-library/jest-dom';
// import axios from 'axios';
import SigninForm from '../src/components/userpage/SigninForm';
// import {login} from '../src/services/authServices';
import React from 'react';
import { StateContext } from "../src/utils/StateContext";
// import { Routes } from "react-router-dom";
import { MemoryRouter } from 'react-router-dom';
// Mock jest and set the type
// jest.mock('axios');
jest.mock('../src/services/authServices', () => {
  login: () => {}
})

const store = {}
const dispatch = () =>{

}


test('loads and displays greeting', async () => {
  // axios.post.mockResolvedValueOnce({
  //   user: {},
  //   token: 'some string',
  // });

  // ARRANGE
  render(<StateContext.Provider value={{ store, dispatch }}>
        <MemoryRouter>
          <SigninForm />
        </MemoryRouter>
        </StateContext.Provider>)

  // ACT
  console.log(screen.getByText('Sign In'))

  // ASSERT
  
})
