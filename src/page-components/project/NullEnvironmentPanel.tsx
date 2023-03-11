import { ElementType } from "react"
import { Paper, Box, Button } from "@mui/material"
import { grey } from "@mui/material/colors"
import { CapitalizeFirstLetter } from "@/core/CapitalizeFirstLetter"
import { EnvironmentType } from "@/DMS/collections/project"


interface EnvironmentProps {
  environmentType: EnvironmentType
  icon: ElementType<any>
}

export const NullEnvironmentPanel = ({ environmentType, icon }: EnvironmentProps) => {
  return (
    <Paper elevation={2} sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: '1rem', height: '330px' }}>
      <Box display="flex" justifyContent="center">
        <Box component={icon} sx={{ fontSize: '3rem' }} color={grey[400]} />
      </Box>
      <Box display="flex" justifyContent="center" sx={{ fontSize: '1rem', fontWeight: 'bold', color: grey[500] }} mt={1}>
        <CapitalizeFirstLetter text={String(environmentType)} />
      </Box>
      <Box display="flex" flexDirection="column" flexGrow={1} m={6}>
        <Box display="flex">
          <Button variant="contained" fullWidth>Buy Now</Button>
        </Box>
        <Box display="flex" mt={2}>
          <Button variant="outlined" fullWidth>View Pricing</Button>
        </Box>
      </Box>
    </Paper>
  )
}
