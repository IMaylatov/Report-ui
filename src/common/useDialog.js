import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';

export default function useDialog(props) {  
  const [dialogContent, setDialogContent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const dialog =
    <Dialog onClose={handleDialogClose} open={openDialog} disableBackdropClick>
      {dialogContent}
    </Dialog>;
  
  return [dialog, { dialogContent, setDialogContent, openDialog, setOpenDialog }];
}