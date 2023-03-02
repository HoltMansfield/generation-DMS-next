import { RenderHttpError } from "@/core/RenderHttpError"
import { Spinner } from "@/core/Spinner"
import { useLogin } from "@/DMS/hooks/api/collections/user/useLogin"
import { useApplicationState } from "@/hooks/state/useApplicationState"
import { LoginForm } from "@/pages/login/LoginForm"
import { Box, Button } from "@mui/material"
import { useRouter } from "next/router"

export default function Login() {
  const router = useRouter()
  const { mutation } = useLogin()
  const { setLoggedInUser } = useApplicationState()


  const handleLogin = (email: string, password: string) => {
    mutation.mutate({ email, password} , {
      onSuccess: (user) => {
        setLoggedInUser(user)
        router.push('/')
      }
    })
  }

  if (mutation.isLoading) {
    return <Spinner />
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1
    }}>
      {mutation.isError && (
        <RenderHttpError message="Email or Password is incorrect" />
      )}
      <Box display="flex" flexGrow={1} marginTop="1rem" marginBottom="1rem" maxHeight="270px">
        <LoginForm handleLogin={handleLogin} />
      </Box>
      <Box display="flex" justifyContent="center" marginTop="1rem">
        <Button onClick={() => router.push('/create-user')}>Create Account</Button>
      </Box>
    </Box>
  )
}
