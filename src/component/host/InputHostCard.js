import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Box,
  Button,
  TextField
} from '@material-ui/core';

export default function InputHostCard(props) {
  const [host, setHost] = useState('');

  return (
    <Card>
      <CardHeader title='Укажите имя хоста'/>
      
      <CardContent>
        <TextField
          value={host}
          onChange={(e) => setHost(e.target.value)}
        />        
      </CardContent>

      <CardActions>
        <Box width={1} display="flex" justifyContent="flex-end">
          <Button variant='contained' color='primary' onClick={() => props.onOk({ ...props.context, host })}>Далее</Button>
        </Box>
      </CardActions>
    </Card>
  )
}