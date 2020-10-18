import React from 'react';
import CloseDialogTitle from '../../common/CloseDialogTitle';
import { DialogContent } from '@material-ui/core';

export default function ReportRunProcess(props) {
  return (
    <React.Fragment>
      <CloseDialogTitle onClose={props.onCancel}>Процесс выполнения</CloseDialogTitle>
      <DialogContent>
        loading...
      </DialogContent>
    </React.Fragment>
  );
}