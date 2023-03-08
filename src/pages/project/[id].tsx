import { Box, Grid, useMediaQuery, useTheme } from "@mui/material"
import { useRouter } from "next/router"
import BugReportIcon from '@mui/icons-material/BugReport'
import ConstructionIcon from '@mui/icons-material/Construction'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import { EnvironmentPanel } from "@/page-components/project/EnvironmentPanel"
import { useFindProject } from "@/DMS/hooks/api/project/useFindProject"
import { Spinner } from "@/core/Spinner"
import { EnvironmentType } from "@/DMS/collections/project"


export default function Project() {
  const theme = useTheme()
  const isDevice = useMediaQuery(theme.breakpoints.down('sm'))
  const router = useRouter()
  const { id } = router.query
  const { data: project, error } = useFindProject({ _id: { $oid: id } })

  if (!project) {
    return <Spinner />
  }

  return (
    <Box display="flex" m={isDevice ? 1.5 : 4}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <EnvironmentPanel
            environmentType={EnvironmentType.dev}
            environment={project.environments[0]}
            icon={ConstructionIcon}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <EnvironmentPanel
            environmentType={EnvironmentType.staging}
            environment={project.environments.length > 1 ? project.environments[1] : null}
            icon={BugReportIcon}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <EnvironmentPanel
            environmentType={EnvironmentType.production}
            environment={project.environments.length === 3 ? project.environments[2] : null}
            icon={CurrencyExchangeIcon}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
