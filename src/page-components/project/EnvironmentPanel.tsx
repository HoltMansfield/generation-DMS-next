import { ElementType } from "react"
import { Paper, Box, Button } from "@mui/material"
import { grey } from "@mui/material/colors"
import Switch from '@mui/material/Switch'
import { CapitalizeFirstLetter } from "@/core/CapitalizeFirstLetter"
import { Environment, EnvironmentStatus, EnvironmentType } from "@/DMS/collections/project"
import { useDisplayTextDialog } from "@/page-components/project-list/useDisplayTextDialog"


interface EnvironmentProps {
  environment: Environment
  environmentType: EnvironmentType
  icon: ElementType<any>
}

export const EnvironmentPanel = ({ environment, environmentType, icon }: EnvironmentProps) => {
  const { GetStringDialog, setDisplayTextDialogOpen } = useDisplayTextDialog({
    text: environment?.key,
    title: `Api Key (${environment?.environmentType})`
  })

  const renderBodyContent = () => {
    if (environment) {
      return (
        <Box display="flex" flexDirection="column" flexGrow={1} alignContent="flex-start">
          <Box display="flex" ml="auto" flexGrow={1}>
            <Box display="flex" mt={0.9}>
              <CapitalizeFirstLetter text={environment?.status} />
            </Box>
            {environment?.status && (
              <Box display="flex">
                <Switch checked={environment?.status === EnvironmentStatus.running} />
              </Box>
            )}
          </Box>
          <Box display="flex" ml="auto" flexGrow={1} mt={2} fontWeight="bold">
            Api Url
          </Box>
          <Box display="flex" ml="auto" flexGrow={1}>
            {environment?.url}
          </Box>
          <Box display="flex" ml="auto" flexGrow={1} mt={3}>
            <Button variant="outlined" onClick={() => setDisplayTextDialogOpen(true)}>Reveal Api Key</Button>
          </Box>
          <Box display="flex" ml="auto" flexGrow={1} mt={1}>
            <Button variant="outlined">Edit Security Settings</Button>
          </Box>
        </Box>
      )
    }

    return (
      <Box display="flex" flexDirection="column" flexGrow={1} m={1} ml={7} mr={5}>
        <Box display="flex">
          <Button variant="contained" fullWidth>Buy Now</Button>
        </Box>
        <Box display="flex" mt={2}>
          <Button variant="outlined" fullWidth>View Pricing</Button>
        </Box>
      </Box>
    )
  }

  return (
    <Paper elevation={3} sx={{ display: 'flex', flexGrow: 1, padding: '1rem', minHeight: '300px', maxHeight: '300px' }}>
      <Box display="flex" flexDirection="column" minWidth="100px">
        <Box display="flex" justifyContent="center">
          <Box component={icon} sx={{ fontSize: '3rem' }} color={grey[400]} />
        </Box>
        <Box display="flex" justifyContent="center" sx={{ fontSize: '1rem', fontWeight: 'bold', color: grey[500] }} mt={1}>
          <CapitalizeFirstLetter text={String(environmentType)} />
        </Box>
      </Box>
      {renderBodyContent()}
      <GetStringDialog />
    </Paper>
  )
}