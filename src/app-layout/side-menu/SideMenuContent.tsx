import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import SearchIcon from '@mui/icons-material/Search'
import SettingsIcon from '@mui/icons-material/Settings'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { NotLoggedIn } from './NotLoggedIn'
import { useApplicationState } from '@/hooks/state/useApplicationState'
import { useRouter } from 'next/router'


export const SideMenuContent = () => {
  const router = useRouter()
  const { sideMenuOpen, setSideMenuOpen, loggedInUser } = useApplicationState()

  const handleNavigate = (url: string) => {
    setSideMenuOpen(false)
    router.push(url)
  }

  if (!loggedInUser) return <NotLoggedIn handleNavigate={handleNavigate} />

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
         Main Navigation
        </ListSubheader>
      }
    >
      <ListItemButton onClick={() => handleNavigate('/create-project/step-1')}>
        <ListItemIcon>
          <AddBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Create Project" />
      </ListItemButton>
      <ListItemButton onClick={() => handleNavigate('/settings/0')}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>
      <ListItemButton onClick={() => handleNavigate('/find-project')}>
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText primary="FindProject" />
      </ListItemButton>
    </List>
  )
}
