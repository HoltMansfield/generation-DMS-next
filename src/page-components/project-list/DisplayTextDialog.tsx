import { useState } from "react"
import { UseDisplayTextDialogProps } from "@/page-components/project-list/useDisplayTextDialog"
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box } from "@mui/material"
import { useAnimate } from "react-simple-animate"
import DoneAllIcon from '@mui/icons-material/DoneAll'


interface DisplayTextDialogProps extends UseDisplayTextDialogProps {
  open: boolean
  setOpen: (newState: boolean) => void
}

export const DisplayTextDialog = ({ open, setOpen, text, title }: DisplayTextDialogProps) => {
  const { style, play } = useAnimate({ start: { opacity: 0 }, end: { opacity: 1 }, duration: 0.6 })

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    play(true)
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
        <Box display="flex" flexGrow={1} mt={2} justifyContent="center" style={style}>
          <Box display="flex">
            Copied
          </Box>
          <Box display="flex" ml={1}>
            <DoneAllIcon />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCopy}>Copy</Button>
        <Button onClick={() => setOpen(false)} variant="outlined">Close</Button>
      </DialogActions>
    </Dialog>
  )
}
