import { useDmsUser } from '@/DMS/hooks/core/useDmsUser'
import { useMutation } from '@tanstack/react-query'
import { User } from '../../../collections/user'
import { HttpError } from '../../../types/api'


export const useLogout = () => {
  const { logout } = useDmsUser()
 
  const mutation = useMutation<User, HttpError , null>(() => {
    return logout()
  })

  return {
    mutation
  } as const
}
