import React, { useState } from 'react';
import { Select, InputLabel, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Template from '../../templates/Template';
import { encode, decode } from 'iconv-lite';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ReportExplorer from './ReportExplorer';
import { useDialog } from '../../common';
import { 
  DATASET_TYPE_SQLQUERY,
  VARIABLE_TYPE_SELECT, 
  VARIABLE_TYPE_DATE, 
  VARIABLE_TYPE_MULTIPLE_SELECT, 
  VARIABLE_TYPE_PERIOD 
} 
from '../../constants';
import SelectDataSource from '../../dataSources/SelectDataSource';

export default function MalibuReport(props) {
  const documentVariable = props.value.report.variables.find(x => x.name === 'Document');
  const [reportType, setReportType] = useState(documentVariable ? documentVariable.type : 'none');
  
  const [dialog, { setDialogContent, setOpenDialog }] = useDialog();
  
  const handleTemplateChange = (template) => {
    props.value.template = template;

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
            dataSource: props.value.report.dataSources[0],
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
  }

  const handleDataTypeChange = (e) => {
    const type = e.target.value;
    setReportType(type);
    if (type === 'none') {
      if (props.value.report.variables.length > 0 && props.value.report.variables[0].name === 'Document') {
        props.value.report.variables.shift();
      }
    } else {
      let variable = {
        id: 0,
        name: 'Document',
        label: type === VARIABLE_TYPE_SELECT.name ? VARIABLE_TYPE_SELECT.label : VARIABLE_TYPE_MULTIPLE_SELECT.label,
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
      if (documentVariable !== null) {
        const indexDocumentVariable = props.value.report.variables.indexOf(documentVariable);
        props.value.report.variables.slice(indexDocumentVariable, 1);
      }
      props.value.report.variables = [variable, ...props.value.report.variables];
    }

    props.onChange({ ...props.value });
  }

  const handleDataSourceSelectClick = (e) => {    
    setDialogContent(<SelectDataSource report={props.value.report}
      onSave={(dataSource) => {
        props.value.report.dataSources = [dataSource];
        props.onChange({ ...props.value });
        setOpenDialog(false)
      }}
      onCancel={setOpenDialog(false)}/>);
    setOpenDialog(true);
  }

  return (
    <React.Fragment>
        <Grid item xs={3}>
          <ReportExplorer 
            report={props.value.report} 
            onChange={(report) => props.onChange({ ...props.value, report })}/>
        </Grid>

        <Grid item xs={9}>
          <Grid container direction="row" alignItems="center">
            <label>Источник данных: {props.value.report.dataSources.length > 0 ? props.value.report.dataSources[0].name : 'Не выбран'}</label>
            <Button onClick={handleDataSourceSelectClick} variant="contained" color='primary'>Выбрать</Button>
          </Grid>
          
          <Template 
            report={props.value.report} 
            template={props.value.template} 
            onChange={handleTemplateChange}/>                      

          {props.value.template.data !== null &&
            <FormControl>
              <InputLabel>Тип отчета</InputLabel>
              <Select
                label="Тип отчета"
                required 
                value={reportType}
                onChange={handleDataTypeChange}
              >
                <MenuItem value='none'>Произвольный отчет</MenuItem>
                <MenuItem value={VARIABLE_TYPE_SELECT.name}>Отчет по документу</MenuItem>
                <MenuItem value={VARIABLE_TYPE_MULTIPLE_SELECT.name}>Отчет по набору документов</MenuItem>
              </Select>
            </FormControl> 
          }
        </Grid>

        {dialog}
    </React.Fragment>
  );
}