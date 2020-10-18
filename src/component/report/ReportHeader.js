import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, Grid, TextField } from '@material-ui/core';
import { Link } from "react-router-dom";
import LogoIcon from '../common/icons/LogoIcon';

const useStyles = makeStyles((theme) => ({
  header: {
    zIndex: theme.zIndex.drawer + 1,
  },
  logoButton: {
    color: '#fff',
    fontSize: 18,
    "&:hover": {
      backgroundColor: "transparent",
    }
  },
  nameField: {    
    width: 400,
    paddingBottom: 1.5,
    '& .MuiOutlinedInput-root': {
      '& input': {
        color: '#ffffff',
        paddingTop: 3.5,
        paddingBottom: 3.5,
        paddingLeft: 5
      },
      '&:hover fieldset': {
        borderColor: '#a9b7c4',
      },
      '&:not(hover) fieldset': {
        borderColor: 'transparent',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#a9b7c4',
      },
    }
  },
  menuButton: {
    color: '#ffffff',
    textTransform: 'none',
    fontSize: 14,
    padding: '2px  5px'
  }
}));

export default function ReportHeader(props) {
  const classes = useStyles();

  const handleNameChange = (e) => {
    props.report.name = e.target.value;
    props.onChange(props.report);
  }

  return (
    <React.Fragment>
      <AppBar elevation={0} className={classes.header}>
        <Toolbar>      
          <Button
            component={Link}
            to='/'
            disableRipple
            startIcon={<LogoIcon />}
            className={classes.logoButton}
          />
          
          <Grid container direction="column">
            <Grid item>
              <TextField value={props.report.name} onChange={handleNameChange} 
                required
                variant="outlined"
                className={classes.nameField}/>
            </Grid>

            <Grid item>
              <Button type="submit" className={classes.menuButton}>Сохранить</Button>
              <Button onClick={props.onRunClick} className={classes.menuButton}>Запустить</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}