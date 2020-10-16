import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ReportExplorer from './ReportExplorer';
import Template from '../../templates/Template';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function ClosedXmlReport(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
       <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <ReportExplorer 
              report={props.value.report} 
              onChange={(report) => props.onChange({ ...props.value, report })}/>
          </div>
        </Drawer>

      <main className={classes.content}>
        <Toolbar />
        <Template 
          report={props.value.report} 
          template={props.value.template} 
          onChange={(template) => props.onChange({ ...props.value, template })}/>
      </main>
    </React.Fragment>
  );
}