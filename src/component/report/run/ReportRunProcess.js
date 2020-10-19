import React from 'react';
import CloseDialogTitle from '../../common/CloseDialogTitle';
import { DialogContent, Box, CircularProgress } from '@material-ui/core';

export default function ReportRunProcess(props) {
  return (
    <React.Fragment>
      <CloseDialogTitle onClose={props.onCancel}>Процесс выполнения</CloseDialogTitle>
      <DialogContent>
        <Box display='flex' justifyContent='center'>
          <CircularProgress />
        </Box>
      </DialogContent>
    </React.Fragment>
  );
}