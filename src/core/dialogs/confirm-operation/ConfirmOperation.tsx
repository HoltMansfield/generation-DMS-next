import { UseConfirmOperationDialogProps } from "@/core/dialogs/confirm-operation/useConfirmOperationDialog"
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material"

interface Props extends UseConfirmOperationDialogProps {
  open: boolean
  setOpen: (newState: boolean) => void
}

export const ConfirmOperationDialog = ({ open, setOpen, title, text, handleCancel, handleConfirm }: Props) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          setOpen(false)
          handleCancel()
        }}>Cancel</Button>
        <Button onClick={() => {
          setOpen(false)
          handleConfirm()
        }} autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}
