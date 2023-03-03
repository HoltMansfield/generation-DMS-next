import { useEffect } from "react"
import { useGetLoggedInUser } from "@/DMS/hooks/api/user/useGetLoggedInUser"
import { useApplicationState } from "@/hooks/state/useApplicationState"


export const FetchLoggedInUser = () => {
  const { setLoggedInUser } = useApplicationState()
  const { data } = useGetLoggedInUser()

  useEffect(() => {
    if (data) setLoggedInUser(data)
  }, [data])

  return null
}
