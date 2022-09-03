import { fireEvent, render, screen } from '@testing-library/react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router'
import { SubscribeButton } from '.';

jest.mock('next-auth/react')
jest.mock('next/router')

describe('SignInButton Component', () => {
  it('renders correctly', () => {
    jest
      .mocked(useSession)
      .mockReturnValueOnce({
        data: null,
        status: "unauthenticated"
      })

    render(<SubscribeButton />)

    expect(screen.getByText('Subscribe now')).toBeInTheDocument();
  })

  it('redirects user to sign in when not authenticated', () => {
    jest
      .mocked(useSession)
      .mockReturnValueOnce({
        data: null,
        status: "unauthenticated"
      })

    const signInMocked = jest.mocked(signIn);

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled()
  })

  it('redirects to posts when user already has a subscription', () => {
    jest
      .mocked(useSession)
      .mockReturnValueOnce({
        data: {
          expires: "Fake",
          activeSubscription: "fake-active-subscription",
          user: {
            name: "John Doe",
            email: "john.doe@example.com"
          }
        },
        status: "authenticated"
      })

    const pushMock = jest.fn()
    jest
      .mocked(useRouter)
      .mockReturnValueOnce({
        push: pushMock
      } as any)

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton);

    expect(pushMock).toHaveBeenCalledWith('/posts')
  })
})
