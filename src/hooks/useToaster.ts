import { toast } from 'react-toastify'

const OPTIONS = {
  autoClose: 3500,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: 'light'
}

export const useToaster = () => {
  const toastError = (message: string) => {
    //@ts-expect-error
    toast.error(message, {
      ...OPTIONS,
      position: "top-center"
    })
  }

  const success = (message: string) => {
    //@ts-expect-error
    toast.success(message, {
      ...OPTIONS,
      position: "bottom-right"
    })
  }

  return {
    toastError,
    success
  } as const
}
