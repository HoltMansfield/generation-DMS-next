import { useState } from "react"
import { Box, Button, TextField } from "@mui/material"
import { useQueryClient } from '@tanstack/react-query'
import { useCreateProject } from "@/DMS/hooks/api/project/useCreateProject"
import { useApplicationState } from "@/hooks/state/useApplicationState"
import { useToaster } from "@/hooks/useToaster"
import { Environment, EnvironmentType, EnvironmentStatus } from "@/DMS/collections/project"


export const NoProjects = () => {
  const [projectName, setProjectName] = useState('')
  const { mutation } = useCreateProject()
  const { loggedInUser, setSelectedProject } = useApplicationState()
  const { toastError } = useToaster()
  const queryClient = useQueryClient()

  const handleCreateProject = () => {
    const devEnvironment: Environment = {
      environmentType: EnvironmentType.dev,
      status: EnvironmentStatus.running,
      browserOnly: true,
      key: crypto.randomUUID(),
      url: 'api.generation-dms.com'
    }
    const newProject = {
      name: projectName,
      userId: loggedInUser._id,
      environments: [devEnvironment]
    }

    mutation.mutate(newProject, {
      onSuccess: (data) => {
        setSelectedProject(data)
        queryClient.setQueryData(['findProjects'], [data])
      }, onError: (error) => {
        toastError(`An error occurred while creating this project. Please refresh the browser and try again. ${error.message}`)
      }
    })
  }

  return (
    <Box display="flex" m={4} flexDirection="column" maxWidth="500px">
      <Box display="flex" fontSize="1.5rem">
        Welcome new user!
      </Box>
      <Box display="flex" mt={2}>
        To get started, please create a project.
      </Box>
      <Box display="flex" mt={2}>
        A project is made up of a Dev, Staging & Production Environment.
      </Box>
      <Box display="flex" mt={1}>
        Each environment has a dedicated Mongo Database.
      </Box>
      <Box display="flex" mt={4}>
        <TextField label="Project Name" fullWidth value={projectName} onChange={(e) => setProjectName(e.target.value)} />
      </Box>
      <Box display="flex" mt={2}>
        <Button fullWidth variant="outlined" onClick={handleCreateProject}>Create Project</Button>
      </Box>
    </Box>
  )
}
