import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import { useRouter } from 'next/router'
import { useApplicationState } from '../hooks/state/useApplicationState'
import { useLogout } from '@/DMS/hooks/api/collections/user/useLogout'
import { useToaster } from '@/hooks/useToaster'
import { Box } from '@mui/material'

export const AppBar = () => {
  const { sideMenuOpen, setSideMenuOpen, loggedInUser, setLoggedInUser } = useApplicationState()
  const { mutation } = useLogout()
  const { toastError } = useToaster()
  const router = useRouter()

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
        {loggedInUser && (
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
        )}
        <Typography variant="h6" component="div">
          Generation DMS
        </Typography>
        <Box component={BatteryChargingFullIcon} display="flex" mb={0.2} />
        <Box display="flex" marginLeft="auto">
          <Button color="inherit" onClick={() => router.push('/about')}>About</Button>
          <Button color="inherit" onClick={() => router.push('/getting-started')}>Getting Started</Button>
          <Button color="inherit" onClick={() => router.push('/docs')}>Docs</Button>
          {!loggedInUser && !mutation.isLoading && <Button color="inherit" onClick={() => router.push('/login')}>Login</Button>}
          {loggedInUser && !mutation.isLoading && <Button color="inherit" onClick={handleLogout}>Logout</Button>}
          {mutation.isLoading && <HourglassBottomIcon />}
        </Box>
      </Toolbar>
    </MuiAppBar>
  )
}
