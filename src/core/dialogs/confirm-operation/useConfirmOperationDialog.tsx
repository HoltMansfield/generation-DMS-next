import { ConfirmOperationDialog as Dialog } from '@/core/dialogs/confirm-operation/ConfirmOperation'
import { useState, useCallback } from 'react'


export interface UseConfirmOperationDialogProps {
  text: string
  title: string
  handleCancel: () => void
  handleConfirm: () => void
}

export const useConfirmOperationDialog = (props: UseConfirmOperationDialogProps) => {
  const [confirmOperationOpen, setConfirmOperationDialogOpen] = useState(false)

  const ConfirmOperationDialog = useCallback(() => {
    return <Dialog {...props} open={confirmOperationOpen} setOpen={setConfirmOperationDialogOpen} />
  }, [confirmOperationOpen])

  return {
    setConfirmOperationDialogOpen,
    ConfirmOperationDialog
  } as const
}
