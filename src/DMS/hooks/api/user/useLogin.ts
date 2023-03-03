import { useDmsUser } from '@/DMS/hooks/core/useDmsUser'
import { useMutation } from 'react-query'
import { User } from '../../../collections/user'
import { HttpError } from '../../../types/api'

interface LoginAttempt {
  email: string
  password: string
}

export const useLogin = () => {
  const { login } = useDmsUser()

  const mutation = useMutation<User, HttpError , LoginAttempt>((attempt: LoginAttempt) => {
    return login(attempt.email, attempt.password)
  })

  return {
    mutation
  } as const
}
