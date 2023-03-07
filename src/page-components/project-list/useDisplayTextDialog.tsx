import { DisplayTextDialog } from '@/page-components/project-list/DisplayTextDialog'
import { useState, useCallback } from 'react'


export interface UseDisplayTextDialogProps {
  text: string
  title: string
}

export const useDisplayTextDialog = (props: UseDisplayTextDialogProps) => {
  const [displayTextDialogOpen, setDisplayTextDialogOpen] = useState(false)

  const GetStringDialog = useCallback(() => {
    return <DisplayTextDialog {...props} open={displayTextDialogOpen} setOpen={setDisplayTextDialogOpen} />
  }, [displayTextDialogOpen])

  return {
    setDisplayTextDialogOpen,
    GetStringDialog
  } as const
}
