import { Box, Button, TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import { FormWrapper } from "@/forms/core/FormWrapper"
import { emailRegex } from "@/forms/core/regex"


interface CreateUserFormProps {
  handleCreateUser: (data: any) => void
}

export const CreateUserForm = ({ handleCreateUser }: CreateUserFormProps) => {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm()

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(handleCreateUser)} style={{ display: 'flex', flexGrow: '1' }}>
        <Box display="flex" flexDirection="column" flexGrow={1}>
          <Box display="flex">
            <TextField label="Email *" variant="outlined" fullWidth {...register("email", { required: true, pattern: emailRegex })} />
          </Box>
          {errors.email?.type === 'required' && <Box display="flex">Email is required</Box>}
          {errors.email?.type === 'pattern' && <Box display="flex">Email is invalid</Box>}
          <Box display="flex" marginTop="1rem">
            <TextField label="Password *" variant="outlined" fullWidth type="password" {...register("password", { required: true })} />
          </Box>
          {errors.password && <Box display="flex">Password is required</Box>}
          <Box display="flex" marginTop="1rem">
            <TextField
              label="Confirm Password *"
              variant="outlined"
              fullWidth
              type="password" {...register("passwordConfirm", { 
                required: true,
                validate: (value: string) => {
                  if(getValues('password') !== value) {
                    return 'Passwords fail'
                  }
                }
              })} />
          </Box>
          {errors.passwordConfirm?.type === 'required' && <Box display="flex">Password is required</Box>}
          {errors.passwordConfirm?.type === 'validate' && <Box display="flex">Passwords not the same</Box>}
          <Box display="flex" marginTop="1rem">
            <TextField label="Display Name (Optional)" variant="outlined" fullWidth {...register("name")} />
          </Box>
          <Box display="flex" marginTop="1rem"><Button type="submit" variant="outlined">Create</Button></Box>
        </Box>
      </form>
    </FormWrapper>
  )
}
