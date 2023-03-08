import { ElementType, useState } from "react"
import { Paper, Box, Button, IconButton } from "@mui/material"
import { grey } from "@mui/material/colors"
import Switch from '@mui/material/Switch'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import { CapitalizeFirstLetter } from "@/core/CapitalizeFirstLetter"
import { Environment, EnvironmentStatus, EnvironmentType } from "@/DMS/collections/project"
import { useDisplayTextDialog } from "@/core/dialogs/display-text/useDisplayTextDialog"
import { NullEnvironmentPanel } from "@/page-components/project/NullEnvironmentPanel"
import { useConfirmOperationDialog } from "@/core/dialogs/confirm-operation/useConfirmOperationDialog"
import { useUpdateProject } from "@/DMS/hooks/api/project/useUpdateProject"
import { useFindProject } from "@/DMS/hooks/api/project/useFindProject"
import { useRouter } from "next/router"
import { useToaster } from "@/hooks/useToaster"
import { useQueryClient } from "@tanstack/react-query"


interface EnvironmentProps {
  environment: Environment
  environmentType: EnvironmentType
  icon: ElementType<any>
}

export const EnvironmentPanel = ({ environment, environmentType, icon }: EnvironmentProps) => {
  const router = useRouter()
  const { id } = router.query
  const [urlIsCopied, setUrlIsCopied] = useState(false)
  const { mutation } = useUpdateProject()
  const query = { _id: { $oid: id } }
  const { data: project } = useFindProject(query)
  const { toastError } = useToaster()
  const queryClient = useQueryClient()

  const { DisplayTextDialog: GetStringDialog, setDisplayTextDialogOpen } = useDisplayTextDialog({
    text: environment?.key,
    title: `Api Key (${environment?.environmentType})`
  })

  const handleStatusChange = () => {
    const newStatus = environment?.status === EnvironmentStatus.running
      ? EnvironmentStatus.stopped
      : EnvironmentStatus.running
  
    const updateableEnvironment = {...environment, status: newStatus }
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
        toastError(`An error occurred while setting the status for this Project. Please refresh the page and try again. ${error.message}`)
      }
    })
  }

  const { ConfirmOperationDialog, setConfirmOperationDialogOpen } = useConfirmOperationDialog({
    text: environment?.status === EnvironmentStatus.running
      ? 'Turn Services off. Prevent all incoming requests.'
      : 'Turn Services On. Allow incoming requests.',
    title: environment?.status === EnvironmentStatus.running
    ? 'Power off'
    : 'Power on',
    handleCancel: () => {},
    handleConfirm: handleStatusChange
  })

  const renderBodyContent = () => {
    return (
      <Box display="flex" flexDirection="column" flexGrow={1} alignContent="flex-start">
        <Box display="flex" ml="auto" flexGrow={1}>
          <Box display="flex" mt={0.9}>
            <CapitalizeFirstLetter text={environment?.status} />
          </Box>
          {environment?.status && (
            <Box display="flex">
              <Switch checked={environment.status === EnvironmentStatus.running} onClick={() => setConfirmOperationDialogOpen(true)} />
            </Box>
          )}
        </Box>
        <Box display="flex" flexDirection="column" mt={1.5}>
          <Box display="flex" ml="auto" flexGrow={1} fontWeight="bold">
            Api Url
          </Box>
          <Box display="flex" ml="auto" flexGrow={1}>
            <Box display="flex" mt={0.7} ml={0.5}>
              {environment?.url}
            </Box>
            <Box display="flex">
              {!urlIsCopied && (
                <IconButton onClick={() => {
                  navigator.clipboard.writeText(environment?.url)
                  setUrlIsCopied(true)
                }}>
                  <ContentCopyIcon />
                </IconButton>
              )}
              {urlIsCopied && (
                <IconButton>
                  <DoneAllIcon />
                </IconButton>
              )}
            </Box>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column">
          <Box display="flex" ml="auto" flexGrow={1} mt={3} width="250px">
            <Button variant="outlined" fullWidth onClick={() => setDisplayTextDialogOpen(true)}>Reveal Api Key</Button>
          </Box>
          <Box display="flex" ml="auto" flexGrow={1} mt={1} width="250px">
            <Button variant="outlined" fullWidth>Edit Security Settings</Button>
          </Box>
        </Box>
      </Box>
    )
  }

  if (!environment) {
    return <NullEnvironmentPanel environmentType={environmentType} icon={icon} />
  }

  return (
    <Paper elevation={3} sx={{ display: 'flex', flexGrow: 1, padding: '1rem', minHeight: '270px', maxHeight: '270px' }}>
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
      <ConfirmOperationDialog />
    </Paper>
  )
}
