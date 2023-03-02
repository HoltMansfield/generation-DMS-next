import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'jotai'
import theme from '@/core/material/theme'
import { AppBar } from '@/app-layout/app-bar/AppBar'
import createEmotionCache from '@/core/material/createEmotionCache'
import { Box } from '@mui/material'
import { SideMenu } from '@/app-layout/side-menu/SideMenu'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()
const queryClient = new QueryClient()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <AppBar />
            <Box display="flex">
              <SideMenu />
            </Box>
            <Component {...pageProps} />
          </ThemeProvider>
        </CacheProvider>
      </QueryClientProvider>
    </Provider>
  )
}
