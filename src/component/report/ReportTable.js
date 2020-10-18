import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem
} from '@material-ui/core';
import { useHistory } from "react-router-dom";
import PlayIcon from '../common/icons/PlayIcon';
import ThreeDotsIcon from '../common/icons/ThreeDotsIcon';

export default function ReportTable(props) {
  const history = useHistory();
  const [menuThreeDotsAnchorEl, setMenuThreeDotsAnchorEl] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  
  const handleThreeDotsClick = (event, report) => {
    setSelectedReport(report);
    setMenuThreeDotsAnchorEl(event.currentTarget);
  };

  const handleThreeDotsMenuClose = () => {
    setMenuThreeDotsAnchorEl(null);
  };

  const handleReportEditClick = () => {
    history.push(`/reports/${selectedReport.id}`);
  }

  const handleReportDeleteClick = () => {
    props.onDeleteReport(selectedReport);
    setMenuThreeDotsAnchorEl(null);
  }
  
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Название</TableCell>
            <TableCell>Тип</TableCell>
            <TableCell align="right" padding='none' width='35px'></TableCell>
            <TableCell align="right" padding='none' width='35px'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>                
                {report.name}
              </TableCell>
              <TableCell>                
                {report.type}
              </TableCell>
              <TableCell align="right" padding='none' width='35px'>            
                <IconButton onClick={(e) => history.push(`/reports/${report.id}/run`)}>
                  <PlayIcon />
                </IconButton>
              </TableCell>
              <TableCell align="right" padding='none' width='35px'>   
                <IconButton onClick={(e) => handleThreeDotsClick(e, report)}>
                  <ThreeDotsIcon />
                </IconButton>
                <Menu
                  anchorEl={menuThreeDotsAnchorEl}
                  keepMounted
                  open={Boolean(menuThreeDotsAnchorEl)}
                  onClose={handleThreeDotsMenuClose}
                >
                  <MenuItem onClick={handleReportEditClick}>Редактировать</MenuItem>
                  <MenuItem onClick={handleReportDeleteClick}>Удалить</MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}