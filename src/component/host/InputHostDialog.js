import React, { useState } from 'react';
import CloseDialogTitle from '../common/CloseDialogTitle';
import {
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@material-ui/core';

export default function ReportHostDialog(props) {
  const [host, setHost] = useState('');

  return (
    <React.Fragment>
      <CloseDialogTitle onClose={props.onCancel}>Укажите имя хоста</CloseDialogTitle>
      
      <DialogContent>
        <TextField
          value={host}
          onChange={(e) => setHost(e.target.value)}
        />        
      </DialogContent>

      <DialogActions>
        <Button variant='contained' color='primary' onClick={() => props.onOk(host)}>Далее</Button>
      </DialogActions>
    </React.Fragment>
  )
}