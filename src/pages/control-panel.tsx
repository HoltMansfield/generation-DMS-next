import { Spinner } from "@/core/Spinner"
import { useFindProjects } from "@/DMS/hooks/api/project/useFindProjects"
import { useApplicationState } from "@/hooks/state/useApplicationState"
import { NoProjects } from "@/page-components/control-panel/NoProjects"
import { Box, List, ListItemButton, ListItemText, Paper } from "@mui/material"
import { useRouter } from "next/router"


export default function ControlPanel() {
  const { loggedInUser } = useApplicationState()
  const { data: projects, error, status } = useFindProjects({ userId: loggedInUser._id })
  const router = useRouter()

  if (status === 'loading') {
    return <Spinner />
  }

  if (projects.length === 0) {
    return <NoProjects />
  }

  return (
    <Box display="flex" flexDirection="column" sx={{ bgcolor: 'background.paper' }} m={4}>
      <Box display="flex" fontSize="1.5rem">
        Please select a project
      </Box>
      <Box display="flex" mt={2} flexGrow={1} maxWidth="400px">
        <Paper elevation={3} sx={{ display: 'flex', flexGrow: 1 }}>
          <List>
            {projects.map(project => {
              return (
                <ListItemButton onClick={() => router.push('/login')}>
                  <ListItemText primary={project.name} />
                </ListItemButton>
              )
            })}
          </List>
        </Paper>
      </Box>
    </Box>
  )
}
