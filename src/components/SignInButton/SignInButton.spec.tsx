import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { SignInButton } from '.';

jest.mock('next-auth/react')

describe('SignInButton Component', () => {
  it('renders correctly when user is not authenticated', () => {
    jest
      .mocked(useSession)
      .mockReturnValueOnce({
        data: null,
        status: "unauthenticated"
      })

    render(<SignInButton />)

    expect(screen.getByText('Sign in with Github')).toBeInTheDocument();
  })

  it('renders correctly when user is authenticated', () => {
    jest
      .mocked(useSession)
      .mockReturnValueOnce({
        data: {
          expires: "Fake",
          user: {
            name: "John Doe",
            email: "john.doe@example.com"
          }
        },
        status: "authenticated"
      })

    render(<SignInButton />)

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  })
})
