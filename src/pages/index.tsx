import { useWindowSize } from '@/hooks/useWindowSize'
import Link from '@/Link'
import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import BoltIcon from '@mui/icons-material/Bolt';
import Head from 'next/head'


export default function Home() {
  const theme = useTheme();
  const isDevice = useMediaQuery(theme.breakpoints.down('sm'))
  const size = useWindowSize()

  return (
    <>
      <Head>
        <title>Generation DMS</title>
        <meta name="description" content="A Back-end-as-a-service that is not designed to rob you" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box display="flex" flexGrow={1} justifyContent="center" m={2} mb={6}>
        <Typography variant="h6">
          <Link href="/get-started">Click here to get started</Link>
        </Typography>
      </Box>
      <Box display="flex" flexGrow={1} justifyContent="center" m={ isDevice ? ".5rem" : "2rem 4rem"} fontSize="2rem">
        Generation DMS is a
      </Box>
      <Box display="flex" flexGrow={1} justifyContent="center" m={2} sx={{ 
          flexDirection: { xs: 'column', md: 'row' }
        }}>
        <Box display="flex" flexDirection="column" minWidth="300px">
          <Box display="flex" flexGrow={1} justifyContent="center">
            Backend-as-a-service
          </Box>
          <Box display="flex" flexGrow={1} justifyContent="center">
            <img src="/pwred-by-mongo-db.png" style={{ width: '200px' }} />
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" minWidth="300px" mt={isDevice ? 4 : null}>
          <Box display="flex" flexGrow={1} justifyContent="center">
            Client Side code generator
          </Box>
          <Box display="flex" flexGrow={1} justifyContent="center">
            <Box display="flex" fontWeight="bold" marginTop="20px">
              DMS-CLI
            </Box>
            <Box display="flex" component={BoltIcon} fontSize="4rem" />
          </Box>
        </Box>
      </Box>
      <Box display="flex" flexGrow={1} m="4rem 1rem 1rem 1rem" fontSize="1.5rem" fontWeight="400" flexDirection="column">
        <Box display="flex" flexGrow={1} justifyContent="center">
          We support
        </Box>
        <Box display="flex" flexGrow={1} justifyContent="center">
          <Box display="flex" marginRight={1}>
            <img src="/typescript-logo.png" style={{ width: '100px' }} />
          </Box>
          <Box display="flex" marginLeft={1}>
            <img src="/js-logo.png" style={{ width: '100px' }} />
          </Box>
        </Box>
      </Box>
      <Box display="flex" flexGrow={1} m="4rem 1rem 1rem 1rem" fontSize="1.5rem" fontWeight="400" flexDirection="column">
        <Box display="flex" flexGrow={1} justifyContent="center">
          Our Data Management System Can be used in any Javascript project (frontend or backend)
        </Box>
        <Box display="flex" flexGrow={1} justifyContent="center">
          Available as Async Functions, RX Observables and react-query
        </Box>
        <Box display="flex" flexGrow={1} justifyContent="center" mt={2}>
          <Box display="flex" marginRight={1}>
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K" style={{ width: '100px' }} />
          </Box>
          <Box display="flex" marginLeft={1}>
            <img src="/js-logo.png" style={{ width: '100px' }} />
          </Box>
        </Box>
      </Box>
      <Box display="flex" flexGrow={1} justifyContent="center" m="2rem 1rem 1rem 1rem">

      </Box>
      <Box display="flex" flexGrow={1} justifyContent="center" m={isDevice ? "1rem" : "4rem 30% 2rem 30%"} fontSize="1.3rem" flexDirection="column">
        <Box display="flex">
          Generation DMS is a thin node wrapper around the MongoDB data-api. The data-api exposes all of the functionality of mongoDB over http.
          On top of the data-api we include endpoints for user management:
          <br /><br />Login/ Logout/ Create User/ Update User/ Reset Password/ Forgot Password.
          <br /><br />Everything you need to get a product built quickly. Please click get started above or check out the video below.
        </Box>
      </Box>
      <Box display="flex" flexGrow={1} justifyContent="center" m="4rem auto">
          {/*
          //@ts-expect-error*/}
          <iframe width={isDevice ? size.width * 0.8 : size.width * 0.5} height={isDevice ? size.width * 0.8 * 0.6 : size.width * 0.5 * 0.6} src="https://www.youtube.com/embed/0-S5a0eXPoc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </Box>
    </>
  )
}
