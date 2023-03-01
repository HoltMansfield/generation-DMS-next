import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Button from '@mui/material/Button'
import { useApplicationState } from '@/hooks/state/useApplicationState'
import { useRouter } from 'next/router'

interface AppBarNavProps {
  handleLogout: () => void
}

export const AppBarNav = ({ handleLogout }: AppBarNavProps) => {
  const theme = useTheme()
  const isDevice = useMediaQuery(theme.breakpoints.down('sm'))
  const { sideMenuOpen, setSideMenuOpen, loggedInUser, setLoggedInUser } = useApplicationState()
  const router = useRouter()

  if (isDevice) {
    return <div>D</div>
  }

  return (
    <>
      <Button color="inherit" onClick={() => router.push('/about')}>About</Button>
      <Button color="inherit" onClick={() => router.push('/getting-started')}>Getting Started</Button>
      <Button color="inherit" onClick={() => router.push('/docs')}>Docs</Button>
      {!loggedInUser && <Button color="inherit" onClick={() => router.push('/login')}>Login</Button>}
      {loggedInUser && <Button color="inherit" onClick={handleLogout}>Logout</Button>}
    </>
  )
}
