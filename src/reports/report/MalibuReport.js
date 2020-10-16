import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Select } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Template from '../../templates/Template';
import { encode, decode } from 'iconv-lite';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ReportExplorer from './ReportExplorer';
import { Typography } from '@material-ui/core';
import { 
  DATASET_TYPE_SQLQUERY,
  VARIABLE_TYPE_SELECT, 
  VARIABLE_TYPE_DATE, 
  VARIABLE_TYPE_MULTIPLE_SELECT, 
  VARIABLE_TYPE_PERIOD 
} 
from '../../constants';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';

const disabledFields = [
  'ReportExplorer.DataSource.name',
  'ReportExplorer.DataSource.type',

  'ReportExplorer.DataSet.name',
  'ReportExplorer.DataSet.type',
  'ReportExplorer.DataSet.SqlQueryDataSet.dataSourceName',
  'ReportExplorer.DataSet.SqlQueryDataSet.query',

  'ReportExplorer.Variable.name',  
  'ReportExplorer.Variable.label',
  'ReportExplorer.Variable.type',
  'ReportExplorer.Variable.SelectDataVariable.dataSourceName'
];

const disabletor = (name) => {
  return disabledFields.includes(name);
};

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
  typeField: {
    width: 300
  }
}));

export default function MalibuReport(props) {
  const classes = useStyles();

  const documentVariable = props.value.report.variables.find(x => x.name === 'Document');
  const [reportType, setReportType] = useState(documentVariable ? documentVariable.type : 'none');
  
  const handleTemplateChange = (template) => {
    props.value.template = template;
    
    if (template.data) {
      let reader = new FileReader();
      reader.onload = (e) => {
        const parser = new DOMParser();
        const templateXml = parser.parseFromString(e.target.result, "text/xml");
        const reportDescBase64 = templateXml.getElementsByTagName("ReportDesc")[0].childNodes[0].nodeValue;
        const reportDesc = atob(reportDescBase64);    

        const reportDescXml = parser.parseFromString(reportDesc, "text/xml");

        let xmlDataSets = Array.prototype.slice.call(reportDescXml.getElementsByTagName("DATASET"));
        let dataSets = xmlDataSets.map(x => {
          return {
            name: x.getAttribute('NAME'),
            type: DATASET_TYPE_SQLQUERY,
            data: {
              dataSourceName: props.value.report.dataSources[0].name,
              query: x.getElementsByTagName("SQL")[0].childNodes[0].nodeValue
            }
          }
        });
        props.value.report.dataSets = dataSets;

        let xmlVariables = Array.prototype.slice.call(reportDescXml.getElementsByTagName("PARAM"));
        let variables = xmlVariables.map(x => {
          let name = x.getAttribute('NAME');
          let labelBuffer = encode(x.getElementsByTagName("QUERY_STRING")[0].childNodes[0].nodeValue, 'iso-8859-1');
          let label = decode(labelBuffer, 'win1251');
          let type = x.getElementsByTagName("PARAM_TYPE")[0].childNodes[0].nodeValue;
          
          switch(type) {
            case '0':
              return { name, label, type: VARIABLE_TYPE_SELECT.name, 
                data: { 
                  captionField: '', 
                  dataSet: { type: 'SqlQuery', data: { dataSourceName: props.value.report.dataSources[0].name, query: '' } }
                }  };
            case '1':
              return { name, label, type: VARIABLE_TYPE_MULTIPLE_SELECT.name, 
                data: { 
                  captionField: '', keyField: '', 
                  dataSet: { type: 'SqlQuery', data: { dataSourceName: props.value.report.dataSources[0].name, query: '' } }
                } };
            case '3':
              return { name, label, type: VARIABLE_TYPE_DATE.name };
            case '4':
              return { name, label, type: VARIABLE_TYPE_PERIOD.name };
            default:
              return { name, label };
          }
        });

        if (documentVariable) {
          props.value.report.variables = [documentVariable, ...variables];
        } else {
          props.value.report.variables = variables;
        }
        
        props.onChange({ ...props.value });
      };

      reader.readAsText(template.data);      
    } else {
      props.value.report.dataSets = [];
      props.value.report.variables = [];
      props.onChange({ ...props.value });
      setReportType('none');
    }
  }

  const removeDocumentVariable = () => {
    if (documentVariable != null) {
      const indexDocumentVariable = props.value.report.variables.indexOf(documentVariable);
      props.value.report.variables.splice(indexDocumentVariable, 1);
    }
  }

  const handleDataTypeChange = (e) => {
    const type = e.target.value;
    setReportType(type);
    if (type === 'none') {
      removeDocumentVariable();
    } else {
      let variable = {
        id: 0,
        name: 'Document',
        label: type === VARIABLE_TYPE_SELECT.name ? 'Документ' : 'Документы',
        type,
        data: {
          captionField: '',
          keyField: '',
          dataSet: {
            type: 'SqlQuery',
            data: {
              dataSourceName: props.value.report.dataSources[0].name,
              query: ''
            }
          }
        }
      }
      
      removeDocumentVariable();
      props.value.report.variables = [variable, ...props.value.report.variables];
    }

    props.onChange({ ...props.value });
  }

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
            addItemHidden deleteItemHidden
            disabletor={disabletor}
            report={props.value.report} 
            onChange={(report) => props.onChange({ ...props.value, report })}/>
        </div>
      </Drawer>
    
      <main className={classes.content}>
        <Toolbar />

        <Grid container direction="column" spacing={2}>          
          <Grid item>
            <Template 
              report={props.value.report} 
              template={props.value.template} 
              onChange={handleTemplateChange}/>   
          </Grid>                   

          {props.value.template.data !== null &&
            <Grid item>
              <Typography variant="h6">
                Тип отчета
              </Typography> 

              <FormControl className={classes.typeField}>
                <Select
                  required 
                  value={reportType}
                  onChange={handleDataTypeChange}
                >
                  <MenuItem value='none'>Произвольный отчет</MenuItem>
                  <MenuItem value={VARIABLE_TYPE_SELECT.name}>Отчет по документу</MenuItem>
                  <MenuItem value={VARIABLE_TYPE_MULTIPLE_SELECT.name}>Отчет по набору документов</MenuItem>
                </Select>
              </FormControl>   
            </Grid>    
          }
        </Grid>
      </main>
    </React.Fragment>
  );
}