import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'jotai'
import { AppBar } from '@/app-layout/app-bar/AppBar'
import createEmotionCache from '@/core/material/createEmotionCache'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { SideMenu } from '@/app-layout/side-menu/SideMenu'
import { SideMenuContent } from '@/app-layout/side-menu/SideMenuContent'
import { MobileAppBar } from '@/app-layout/app-bar/MobileAppBar'
import { FetchLoggedInUser } from '@/data-fetching/FetchLoggedInUser'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()
const queryClient = new QueryClient()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) {
  const theme = useTheme()
  const isDevice = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          <FetchLoggedInUser />
          <ThemeProvider theme={theme}>
            {isDevice && (
              <>
                <CssBaseline />
                <MobileAppBar />
                <Box display="flex">
                  <SideMenu />
                </Box>
                <Component {...pageProps} />
              </>
            )}
            {!isDevice && (
              <Box display="flex" flexDirection="column" height="100vh">
                <CssBaseline />
                <AppBar />
                <Box display="flex" flexGrow={1}>
                  <Box display="flex" sx={{ borderRight: '1px solid grey' }}>
                    <SideMenuContent />
                  </Box>
                  <Box display="flex" flexGrow={1} flexDirection="column">
                    <Component {...pageProps} />
                  </Box>
                </Box>
              </Box>
            )}
          </ThemeProvider>
        </CacheProvider>
      </QueryClientProvider>
    </Provider>
  )
}
