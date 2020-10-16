import React, { useState } from 'react';
import { Typography, Card, CardContent } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { REPORT_TYPE_CLOSEDXML, REPORT_TYPE_MALIBU } from '../../constants';
import Report from './Report';
import Header from '../../common/Header';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({  
  root: {
    paddingTop: 10
  },
  cardReport: {
    cursor: 'pointer',
    textAlign: 'center'
  },
}));

export default function AddReport() {
  const classes = useStyles();

  const [report, setReport] = useState({
    id: 0,
    name: 'Новый отчет',
    type: '',
    dataSources: [],
    dataSets: [],
    variables: []
  })
  const template = {
    id: 0,
    data: null
  }

  const handleTypeSelect = (type) => {
    report.type = type;
    switch(type) {
      case REPORT_TYPE_MALIBU:
        report.dataSources = [
          {
            id: 0,
            name: "DataSource",
            type: "msSql",
            data: {
                connectionString: '',
                connectionType: 'connectionString'
            }
          }
        ]
        break;
      default:
        break;
    }
    setReport({...report });
  }

  return (
    <React.Fragment>
      {report.type === '' &&
        <React.Fragment>
          <Header />

          <Container maxWidth="lg" className={classes.root}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>Выберите тип отчета</Typography>
              </Grid>
              <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      <Card onClick={() => handleTypeSelect(REPORT_TYPE_CLOSEDXML)}>
                        <CardContent className={classes.cardReport}>
                          ClosedXml
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item xs={2}>
                      <Card onClick={() => handleTypeSelect(REPORT_TYPE_MALIBU)}>
                        <CardContent className={classes.cardReport}>
                          Malibu
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
              </Grid>
            </Grid>
          </Container>
        </React.Fragment>
      }
      {report.type !== '' &&
        <Report value={{ report, template }}/>
      }      
    </React.Fragment>    
  );
}