import { CreateUserAttempt, useCreateUser } from "@/DMS/hooks/api/user/useCreateUser"
import { CreateUserForm } from "@/forms/CreateUserForm"
import { useApplicationState } from "@/hooks/state/useApplicationState"
import { useToaster } from "@/hooks/useToaster"
import { Box, Button } from "@mui/material"
import { useRouter } from "next/router"


export default function CreateAccount() {
  const { mutation } = useCreateUser()
  const { setLoggedInUser } = useApplicationState()
  const { toastError } = useToaster()
  const router = useRouter()

  const handleCreateUser = async (data: CreateUserAttempt) => {
    mutation.mutate(data , {
      onSuccess: (user) => {
        setLoggedInUser(user)
        router.push('/')
      }, onError: (error) => {
        toastError(error.message)
      }
    })
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1
    }}>
      <Box display="flex" flexGrow={1} marginTop="1rem" marginBottom="1rem" maxHeight="460px">
        <CreateUserForm handleCreateUser={handleCreateUser} />
      </Box>
      <Box display="flex" justifyContent="center" marginTop="1rem">
        <Button onClick={() => router.push('/login')}>Log In</Button>
      </Box>
    </Box>
  )
}
