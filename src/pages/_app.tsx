import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider, useTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'jotai'
import createEmotionCache from '@/core/material/createEmotionCache'
import { FetchLoggedInUser } from '@/data-fetching/FetchLoggedInUser'
import { Layout } from '@/app-layout/Layout'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()
const queryClient = new QueryClient()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) {
  const theme = useTheme()

  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          <FetchLoggedInUser />
          <CssBaseline />
          <ThemeProvider theme={theme}>
            <Layout>
              <Component props={pageProps} />
            </Layout>
          </ThemeProvider>
        </CacheProvider>
      </QueryClientProvider>
    </Provider>
  )
}
