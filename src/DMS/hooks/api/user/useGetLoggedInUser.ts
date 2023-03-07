import { getBaseUrl } from "@/DMS/hooks/core/get-base-url"
import { useMutation, useQuery } from '@tanstack/react-query'
import { User } from "src/DMS/collections/user"
import { useHttp } from "src/DMS/hooks/core/useHttp"
import { HttpError } from "src/DMS/types/api"


export const useGetLoggedInUser = () => {
  const { get } = useHttp()
  const base = getBaseUrl()

  const _fetcher = async () => {
    // If our cookie is not expired we will get a user back
    const user = await get('/users')
    return user
  }

  const { status, error, data } = useQuery<User, HttpError>(
    ['cookieUser'],
    _fetcher,
    { staleTime: 1000 * 60 * 60 * 24 * 5 }
  )

  return {
    status, error, data
  } as const
}
