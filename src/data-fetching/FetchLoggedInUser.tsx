import { useEffect } from "react"
import { useGetLoggedInUser } from "@/DMS/hooks/api/user/useGetLoggedInUser"
import { useApplicationState } from "@/hooks/state/useApplicationState"


export const FetchLoggedInUser = () => {
  const { setLoggedInUser } = useApplicationState()
  const { data } = useGetLoggedInUser()

  useEffect(() => {
    // undefined means http request is in flight or not initiated, null if not logged in, object if logged in
    if (data !== undefined) {
      setLoggedInUser(data)
    }
  }, [data])

  return null
}
