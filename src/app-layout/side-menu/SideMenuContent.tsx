import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import FeedIcon from '@mui/icons-material/Feed'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import FolderIcon from '@mui/icons-material/Folder'
import BoltIcon from '@mui/icons-material/Bolt'
import { useApplicationState } from '@/hooks/state/useApplicationState'
import { useRouter } from 'next/router'


export const SideMenuContent = () => {
  const router = useRouter()
  const { sideMenuOpen, setSideMenuOpen, loggedInUser } = useApplicationState()

  const handleNavigate = (url: string) => {
    setSideMenuOpen(false)
    router.push(url)
  }

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
      {!loggedInUser && (
        <ListItemButton onClick={() => handleNavigate('/login')}>
          <ListItemIcon>
            <LockOpenIcon />
          </ListItemIcon>
          <ListItemText primary="Log in" />
        </ListItemButton>
      )}
      {loggedInUser && (
        <ListItemButton onClick={() => handleNavigate('/control-panel')}>
          <ListItemIcon>
            <VideogameAssetIcon />
          </ListItemIcon>
          <ListItemText primary="Control Panel" />
        </ListItemButton>
      )}
      <ListItemButton onClick={() => handleNavigate('/about')}>
        <ListItemIcon>
          <FeedIcon />
        </ListItemIcon>
        <ListItemText primary="About" />
      </ListItemButton>
      <ListItemButton onClick={() => handleNavigate('/getting-started')}>
        <ListItemIcon>
          <BoltIcon />
        </ListItemIcon>
        <ListItemText primary="Getting Started" />
      </ListItemButton>
      <ListItemButton onClick={() => handleNavigate('/docs')}>
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary="Docs" />
      </ListItemButton>
    </List>
  )
}
