import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider, useTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'jotai'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import createEmotionCache from '@/core/material/createEmotionCache'
import { FetchLoggedInUser } from '@/data-fetching/FetchLoggedInUser'
import { Layout } from '@/app-layout/Layout'
import { ProtectRoutes } from '@/core/ProtectRoutes'


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
      <ProtectRoutes />
      <QueryClientProvider client={queryClient}>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          <FetchLoggedInUser />
          <CssBaseline />
          <ToastContainer />
          <ThemeProvider theme={theme}>
            <Layout>
              <>
                <Component props={pageProps} />
                <ReactQueryDevtools initialIsOpen={false} />
              </>
            </Layout>
          </ThemeProvider>
        </CacheProvider>
      </QueryClientProvider>
    </Provider>
  )
}
