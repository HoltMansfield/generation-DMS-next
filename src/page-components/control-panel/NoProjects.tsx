import { useState } from "react"
import { Box, Button, TextField } from "@mui/material"
import { useQueryClient } from '@tanstack/react-query'
import { useCreateProject } from "@/DMS/hooks/api/project/useCreateProject"
import { useApplicationState } from "@/hooks/state/useApplicationState"
import { useToaster } from "@/hooks/useToaster"


export const NoProjects = () => {
  const [projectName, setProjectName] = useState('')
  const { mutation } = useCreateProject()
  const { loggedInUser, setSelectedProject } = useApplicationState()
  const { toastError } = useToaster()
  const queryClient = useQueryClient()

  const UUIDGeneratorBrowser = () =>
  //@ts-ignore
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );

  const handleCreateProject = () => {
    const newProject = {
      name: projectName,
      userId: loggedInUser._id,
      key: UUIDGeneratorBrowser()
    }

    mutation.mutate(newProject, {
      onSuccess: (data) => {
        setSelectedProject(data)
        queryClient.setQueryData(['findProjects'], data)
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
