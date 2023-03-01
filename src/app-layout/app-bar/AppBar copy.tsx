import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull'
import { useApplicationState } from '../../hooks/state/useApplicationState'
import { useLogout } from '@/DMS/hooks/api/collections/user/useLogout'
import { useToaster } from '@/hooks/useToaster'
import { Box } from '@mui/material'
import { AppBarNav } from '@/app-layout/app-bar/AppBarNav'

export const AppBar = () => {
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
          <AppBarNav handleLogout={handleLogout} />
        </Box>
      </Toolbar>
    </MuiAppBar>
  )
}
