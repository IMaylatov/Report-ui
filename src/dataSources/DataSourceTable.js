import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useHistory } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default function DataSourceTable(props) {
  const history = useHistory();
  
  const handleReportClick = (to) => {
    history.push(to);
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Название</TableCell>
            <TableCell>Тип</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.dataSources.map((dataSource) => (
            <TableRow key={dataSource.id}>
              <TableCell component="td" scope="row">                
                {dataSource.name}
              </TableCell>
              <TableCell component="td" scope="row">                
                {dataSource.type}
              </TableCell>
              <TableCell component="td" scope="row">   
                <IconButton onClick={(e) => handleReportClick(`/dataSources/${dataSource.id}`)}>
                  <EditIcon />
                </IconButton>           
                <IconButton onClick={(e) => props.onDeleteDataSource(dataSource)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}