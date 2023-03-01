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


interface AppBarNavProps {
  handleLogout: () => void
}

export const MobileAppBar = ({ handleLogout }: AppBarNavProps) => {
  const router = useRouter()
  const { sideMenuOpen, setSideMenuOpen, loggedInUser, setLoggedInUser } = useApplicationState()

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
          {!loggedInUser && <Button color="inherit" onClick={() => router.push('/login')}>Login</Button>}
          {loggedInUser && <Button color="inherit" onClick={handleLogout}>Logout</Button>}
        </Box>
      </Toolbar>
    </MuiAppBar>
  )
}
