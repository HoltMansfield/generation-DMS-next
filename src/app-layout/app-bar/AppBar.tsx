import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { useRouter } from 'next/router'
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull'
import { Box, Button } from '@mui/material'
import { useApplicationState } from '../../hooks/state/useApplicationState'
import { useLogout } from '@/DMS/hooks/api/user/useLogout'
import { useToaster } from '@/hooks/useToaster'

export const FETCH_FOR_USER_IN_PROGRESS = undefined

export const AppBar = () => {
  const router = useRouter()
  const { loggedInUser, setLoggedInUser } = useApplicationState()
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
        <Typography variant="h6" component="div">
          Generation DMS
        </Typography>
        <Box component={BatteryChargingFullIcon} display="flex" mb={0.2} />
        <Box display="flex" marginLeft="auto">
        {loggedInUser !== FETCH_FOR_USER_IN_PROGRESS && !loggedInUser && <Button color="inherit" onClick={() => router.push('/login')}>Login</Button>}
        {loggedInUser !== FETCH_FOR_USER_IN_PROGRESS && loggedInUser && <Button color="inherit" onClick={handleLogout}>Logout</Button>}
        </Box>
      </Toolbar>
    </MuiAppBar>
  )
}
