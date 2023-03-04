import { Box, useMediaQuery, useTheme } from '@mui/material'
import { AppBar } from '@/app-layout/app-bar/AppBar'
import { SideMenu } from '@/app-layout/side-menu/SideMenu'
import { SideMenuContent } from '@/app-layout/side-menu/SideMenuContent'
import { MobileAppBar } from '@/app-layout/app-bar/MobileAppBar'
import { ReactElement, useEffect, useState } from 'react'

interface LayoutProps {
  children: ReactElement
}

export const Layout = ({ children }: LayoutProps) => {
  const theme = useTheme()
  // This is wrong the first time (toDo)
  const isDevice = useMediaQuery(theme.breakpoints.down('sm'))
  const [hasRendered, setHasRendered] = useState(false)

  useEffect(() => {
    setHasRendered(true)
  },[])

  if (!hasRendered) return null

  if (isDevice) {
    return (
      <>
      <MobileAppBar />
        <Box display="flex">
          <SideMenu />
        </Box>
        {children}
      </>
    )
  }

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <AppBar />
      <Box display="flex" flexGrow={1}>
        <Box display="flex" sx={{ borderRight: '1px solid grey' }}>
          <SideMenuContent />
        </Box>
        <Box display="flex" flexGrow={1} flexDirection="column">
          {children}
        </Box>
      </Box>
    </Box>
  )
}
