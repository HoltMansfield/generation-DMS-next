import { DisplayTextDialog as Dialog } from '@/core/dialogs/display-text/DisplayTextDialog'
import { useState, useCallback } from 'react'


export interface UseDisplayTextDialogProps {
  text: string
  title: string
}

export const useDisplayTextDialog = (props: UseDisplayTextDialogProps) => {
  const [displayTextDialogOpen, setDisplayTextDialogOpen] = useState(false)

  const DisplayTextDialog = useCallback(() => {
    return <Dialog {...props} open={displayTextDialogOpen} setOpen={setDisplayTextDialogOpen} />
  }, [displayTextDialogOpen])

  return {
    setDisplayTextDialogOpen,
    DisplayTextDialog
  } as const
}
