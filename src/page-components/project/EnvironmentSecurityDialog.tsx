import { CapitalizeFirstLetter } from "@/core/CapitalizeFirstLetter"
import { Environment } from "@/DMS/collections/project"
import { useFindProject } from "@/DMS/hooks/api/project/useFindProject"
import { useUpdateProject } from "@/DMS/hooks/api/project/useUpdateProject"
import { useToaster } from "@/hooks/useToaster"
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItemButton, ListItemText, Paper, TextField, useMediaQuery, useTheme } from "@mui/material"
import { useRouter } from "next/router"
import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"


interface EnvironmentSecurityProps {
  environment: Environment
  open: boolean
  setOpen: (newState: boolean) => void
}

export const EnvironmentSecurityDialog = ({ environment, open, setOpen }: EnvironmentSecurityProps) => {
  const theme = useTheme()
  const isDevice = useMediaQuery(theme.breakpoints.down('sm'))
  const router = useRouter()
  const { id } = router.query
  const [newEntry, setNewEntry] = useState('')
  const query = { _id: { $oid: id } }
  const { data: project } = useFindProject(query)
  const { mutation } = useUpdateProject()
  const { toastError } = useToaster()
  const queryClient = useQueryClient()

  const handleAddEntry = () => {  
    const updateableWhitelist = environment.whitelist ? [...environment.whitelist] : []
    updateableWhitelist.push(newEntry)

    const updateableEnvironment = {...environment, whitelist: updateableWhitelist }
    let updatableEnvironments = project.environments.filter(enviro => enviro.status !== environment.status)
    updatableEnvironments.push(updateableEnvironment)

    const update = {
      query: query,
      update: {
        "$set": {
          environments: updatableEnvironments
        }
      }
    }

    mutation.mutate(update, {
      onSuccess: () => {
        queryClient.setQueryData(['findProject', query], {...project, environments: updatableEnvironments })
      },
      onError: (error) => {
        toastError(`An error occurred while updating the Whitelist for this Environment. Please refresh the page and try again. ${error.message}`)
      }
    })
  }

  return (
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullScreen={isDevice}
      >
        <DialogTitle>
          <CapitalizeFirstLetter text={`${environment.environmentType} Security Settings`} />
        </DialogTitle>
        <DialogContent>
          <Box display="flex" fontWeight="bold" fontSize="1.1rem" mt={2}>
            Whitelist
          </Box>
          {environment.whitelist && (
            <Paper elevation={3} sx={{ display: 'flex', flexGrow: 1 }}>
              <List sx={{ display: 'flex', flexGrow:1 }}>
                {environment.whitelist.map(url => {
                  return (
                    <ListItemButton key={url}>
                      <ListItemText primary={url} />
                    </ListItemButton>
                  )
                })}
              </List>
            </Paper>
          )}
          {!environment.whitelist && (
            <Box display="flex" mt={1} fontStyle="italic">
              Right now you do not have any entries in your whitelist. This means any originating url can hit your api. Once you create your first Whitelist Entry only url's on your whitelist can hit your api. 
            </Box>
          )}
          <Box display="flex" mt={2}>
            <TextField fullWidth label="New Url" value={newEntry} onChange={(e) => setNewEntry(e.target.value)} />
          </Box>
          <Box display="flex" mt={1}>
            <Button fullWidth variant="outlined" onClick={handleAddEntry}>Add Url To Whitelist</Button>
          </Box>
          <Box display="flex" mt={4}>
            <Box display="flex" mt={1.1} fontWeight="bold">
              Browser Only
            </Box>
            <Box display="flex">
              <Checkbox checked={environment.browserOnly} />
            </Box>
          </Box>
          <Box display="flex" mt={0.5}>
            When checked this only allows requests to come from the browser
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
  )
}
