import {render, screen} from '@testing-library/react';
// import '@testing-library/jest-dom';
// import axios from 'axios';
// import SigninForm from '../src/components/userpage/SigninForm';
// import {login} from '../src/services/authServices';
import React from 'react';
import SignIn from '../src/pages/SignIn'

jest.mock('../src/components/userpage/SigninForm', () => {
    return <></>
  })

  test('loads and displays greeting', async () => {
    // axios.post.mockResolvedValueOnce({
    //   user: {},
    //   token: 'some string',
    // });
  
    // ARRANGE
    render(
       
            <SignIn/>
    
          )
  
    // ACT
    console.log(screen.getByText('Sign In'))
  
    // ASSERT
    
  })