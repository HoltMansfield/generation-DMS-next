import { Box, Grid, Paper, useMediaQuery, useTheme } from "@mui/material"
import { useRouter } from "next/router"
import BugReportIcon from '@mui/icons-material/BugReport'
import ConstructionIcon from '@mui/icons-material/Construction'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import { grey } from "@mui/material/colors"

export default function Project() {
  const theme = useTheme()
  const isDevice = useMediaQuery(theme.breakpoints.down('sm'))
  const router = useRouter()
  const { id } = router.query
  const paperStyles = { display: 'flex', flexGrow: 1, flexDirection: 'column', padding: '1rem' }
  const titleStyles = { fontSize: '1.2rem', fontWeight: 'bold', color: grey[500] }
//<div>Selected Project {id}</div>
  return (
    <Box display="flex" m={isDevice ? 1.5 : 4}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={paperStyles}>
            <Box display="flex" flexDirection="column">
              <Box display="flex" justifyContent="center" sx={titleStyles}>
                Dev
              </Box>
              <Box display="flex" component={ConstructionIcon} sx={{ fontSize: '5rem' }} color={grey[300]} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={paperStyles}>
            <Box display="flex" flexDirection="column">
              <Box display="flex" justifyContent="center" sx={titleStyles}>
                QA
              </Box>
              <Box display="flex" component={BugReportIcon} sx={{ fontSize: '5rem' }} color={grey[300]} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={paperStyles}>
            <Box display="flex" flexDirection="column">
              <Box display="flex" justifyContent="center" sx={titleStyles}>
                Production
              </Box>
              <Box display="flex" component={CurrencyExchangeIcon} sx={{ fontSize: '5rem' }} color={grey[300]} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
