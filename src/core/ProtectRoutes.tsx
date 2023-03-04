import { useApplicationState } from '@/hooks/state/useApplicationState'
import { useRouter } from 'next/router'


const SECURE_ROUTES = [
  '/control-panel'
]

export const ProtectRoutes = () => {
  const { loggedInUser } = useApplicationState()
  const router = useRouter()

  if (SECURE_ROUTES.includes(router.pathname)) {
    if (loggedInUser === null) {
      router.push('/login')
    }
  }

  return null
}
