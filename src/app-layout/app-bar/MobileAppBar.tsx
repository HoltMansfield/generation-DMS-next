import Button from '@mui/material/Button'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull'
import { useApplicationState } from '@/hooks/state/useApplicationState'
import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { useLogout } from '@/DMS/hooks/api/user/useLogout'
import { useToaster } from '@/hooks/useToaster'
import { FETCH_FOR_USER_IN_PROGRESS } from '@/app-layout/app-bar/AppBar'


export const MobileAppBar = () => {
  const router = useRouter()
  const { sideMenuOpen, setSideMenuOpen, loggedInUser, setLoggedInUser } = useApplicationState()
  const { mutation } = useLogout()
  const { toastError } = useToaster()

  const handleLogout = async () => {
    mutation.mutate(null, {
      onSuccess: () => {
        setLoggedInUser(null)
        location.reload()
      },
      onError: () => toastError('There was an error with your logout. Please refresh the page.')
    })
  }

  return (
    <MuiAppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => setSideMenuOpen(!sideMenuOpen)}
        >
          <MenuIcon />
        </IconButton>
        <Box display="flex" flexGrow={1} justifyContent="center">
          <Typography variant="h6" component="div">
            Generation DMS
          </Typography>
          <Box component={BatteryChargingFullIcon} display="flex" mt={0.2} />
        </Box>
        <Box display="flex" marginLeft="auto">
          {loggedInUser !== FETCH_FOR_USER_IN_PROGRESS && !loggedInUser && <Button color="inherit" onClick={() => router.push('/login')}>Login</Button>}
          {loggedInUser !== FETCH_FOR_USER_IN_PROGRESS && loggedInUser && <Button color="inherit" onClick={handleLogout}>Logout</Button>}
        </Box>
      </Toolbar>
    </MuiAppBar>
  )
}
