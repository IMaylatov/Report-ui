import React, { useState, useEffect } from 'react';
import { TextField, Button, Select } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import { addReport, updateReport, runReport } from '../ReportAPI';
import { addReportTemplate, updateReportTemplate, deleteReportTemplate } from '../../templates/TemplateAPI';
import { useDialog } from '../../common';
import Template from '../../templates/Template';
import { useHistory } from "react-router-dom";
import ReportExplorer from './ReportExplorer';
import * as varConstant from '../../variables/constants';
import { encode, decode } from 'iconv-lite';
import * as dataSetConstant from '../../dataSets/constants';
import InputVariables from '../../variables/InputVariables';
import download from 'downloadjs';
import { getDataSources } from '../../dataSources/DataSourceAPI';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

export default function MalibuReport(props) { 
  const [template, setTemplate] = useState(props.template);
  const [dataSources, setDataSources] = useState([]);
  const [reportType, setReportType] = 
    useState(props.report.variables.some(x => x.name === 'Document' && x.type === "multipleSelect")
              ? 'multipleSelect'
              : props.report.variables.some(x => x.name === 'Document' && x.type === "select")
                ? 'select'
                : 'none');
  const [isLoadedDataSources, setLoadedDataSources] = useState(false);
  const history = useHistory();

  const formik = useFormik({
    initialValues: props.report,
    onSubmit: values => {
      let report = {
        ...values,
        dataSets: values.dataSets.map(x => {
          return {
            ...x,
            data: {
              query: x.data.query,
              dataSourceName: x.data.dataSource.name
            }
          };
        })
      };
      let reportOperation = report.id === 0
        ? addReport(report)
        : updateReport(report.id, report);
      reportOperation.then(report => {
        if (template.id === 0) {
          addReportTemplate(report.id, template.data)
            .then(res => res.json())
            .then(res => history.push(`${report.id}`));
        } else {          
          if (template.data !== null) {
            updateReportTemplate(report.id, template.id, template.data);
          } else {
            deleteReportTemplate(report.id, template.id);
          }
        }
      })
    },
  });
  
  useEffect(() => {
    getDataSources()
      .then(res => {
        setDataSources(res);
        setLoadedDataSources(true);
      });
  }, []);

  const handleTemplateChange = (template) => {
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
          type: dataSetConstant.DATASET_TYPE_SQLQUERY,
          data: {
            dataSource: formik.values.dataSources[0],
            query: x.getElementsByTagName("SQL")[0].childNodes[0].nodeValue
          }
        }
      });
      formik.setFieldValue('dataSets', dataSets);

      let xmlVariables = Array.prototype.slice.call(reportDescXml.getElementsByTagName("PARAM"));
      let variables = xmlVariables.map(x => {
        let name = x.getAttribute('NAME');
        let labelBuffer = encode(x.getElementsByTagName("QUERY_STRING")[0].childNodes[0].nodeValue, 'iso-8859-1');
        let label = decode(labelBuffer, 'win1251');
        let type = x.getElementsByTagName("PARAM_TYPE")[0].childNodes[0].nodeValue;
        
        switch(type) {
          case '0':
            return { name, label, type: varConstant.VARIABLE_TYPE_SELECT.name, data: { captionField: '', dataSet: { type: 'SqlQuery', data: { dataSourceName: formik.values.dataSources[0].name, query: '' } }}  };
          case '1':
            return { name, label, type: varConstant.VARIABLE_TYPE_MULTIPLE_SELECT.name, data: { captionField: '', keyField: '', dataSet: { type: 'SqlQuery', data: { dataSourceName: formik.values.dataSources[0].name, query: '' } }} };
          case '3':
            return { name, label, type: varConstant.VARIABLE_TYPE_DATE.name };
          case '4':
            return { name, label, type: varConstant.VARIABLE_TYPE_PERIOD.name };
          default:
            return { name, label };
        }
      });

      const documentVariable = formik.values.variables.find(x => x.name === 'Document');
      if (documentVariable) {
        formik.setFieldValue('variables', [documentVariable, ...variables]);
      } else {
        formik.setFieldValue('variables', variables);
      }
    };

    reader.readAsText(template.data);

    setTemplate(template);
  }

  const [dialog, { setDialogContent, setOpenDialog }] = useDialog();
  
  const sendRunReport = (variables) => {
    const report = {
      ...formik.values,
      variables
    };

    runReport(report, template)
      .then(response => response.blob())
      .then((blob) => download(blob, `${report.name}.xlsx`));
  } 

  const handleInputVariables = (variables) => {
    setOpenDialog(false);
    sendRunReport(variables);
  }

  const handleRunClick = (e) => {
    if (formik.values.variables.length > 0) {
      setDialogContent(<InputVariables
        report={formik.values} 
        variables={formik.values.variables}
        onOk={handleInputVariables}
        onCancel={(e) => setOpenDialog(false)}/>);
      setOpenDialog(true);
    } else {      
      sendRunReport([]);
    }
  }

  const handleDataSourceChange = (e) => {
    let dataSource = dataSources.find(x => x.id === e.target.value);
    formik.setFieldValue('dataSources', [dataSource]);
  }

  const handleDataTypeChange = (e) => {
    const type = e.target.value;
    setReportType(type);
    switch (type) {
      case 'none':
        if (formik.values.variables.length > 0 && formik.values.variables[0].name === 'Document') {
          formik.values.variables.shift();
          formik.setFieldValue('variables', [...formik.values.variables]);
        }
        break;
      case 'select':
      case 'multipleSelect':
        {
          let variable = {
            id: 0,
            name: 'Document',
            label: type === 'select' ? 'Документ' : 'Набор документов',
            type,
            data: {
              captionField: '',
              keyField: '',
              dataSet: {
                type: 'SqlQuery',
                data: {
                  dataSourceName: formik.values.dataSources[0].name,
                  query: ''
                }
              }
            }
          }
          if (formik.values.variables.length > 0 && formik.values.variables[0].name === 'Document') {
            formik.values.variables.shift();
          }
          formik.setFieldValue('variables', [variable, ...formik.values.variables]);
        }
        break;
      default:
        break;
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
          <Grid item xs={12}>
            <AppBar position="static" color='inherit'>
              <Toolbar>
                <IconButton component={Link} to='/reports' edge="start" color="inherit">
                  <HomeIcon />
                </IconButton>

                <Grid container direction="column">
                  <Grid item>
                    <TextField value={formik.values.name} onChange={formik.handleChange} 
                      name='name' required
                      variant="outlined" size='small'/>
                  </Grid>

                  <Grid item>
                    <Button type="submit" variant='contained' size='small'>Сохранить</Button>
                    <Button variant='contained' size='small' onClick={handleRunClick}>Запустить</Button>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
          </Grid>
          
          <Grid item xs={3}>
            <ReportExplorer report={formik.values} onChange={formik.setValues}/>
          </Grid>

          <Grid item xs={9}>
            {isLoadedDataSources && 
              <FormControl fullWidth>
                <Select
                  label="Источник данных"
                  required 
                  value={formik.values.dataSources.length > 0 ? formik.values.dataSources[0].id : ''}
                  onChange={handleDataSourceChange}
                >
                  {dataSources.map((dataSource) => (
                    <MenuItem key={dataSource.id} value={dataSource.id}>
                      {dataSource.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            }
            
            <Template report={formik.values} template={template} onChange={handleTemplateChange}/>            

            {template.data !== null &&
              <FormControl>
                <Select
                  label="Тип отчета"
                  required 
                  value={reportType}
                  onChange={handleDataTypeChange}
                >
                  <MenuItem value='none'>Произвольный отчет</MenuItem>
                  <MenuItem value='select'>Отчет по документу</MenuItem>
                  <MenuItem value='multipleSelect'>Отчет по набору документов</MenuItem>
                </Select>
              </FormControl> 
            }
            <br/>
            {template.data !== null && formik.values.variables.length > 0 && formik.values.variables[0].name === 'Document' &&
              <React.Fragment>
                <FormControl>
                  <TextField value={formik.values.variables[0].data.captionField} 
                    onChange={formik.handleChange}
                    name='variables[0].data.captionField'
                    label={'Отображаемое поле'} required />
                </FormControl>
                <FormControl>
                  <TextField value={formik.values.variables[0].data.keyField} 
                    onChange={formik.handleChange}
                    name='variables[0].data.keyField'
                    label={'Ключевое поле'} required />
                </FormControl>
                <br/>
                <FormControl>
                  <TextareaAutosize value={formik.values.variables[0].data.dataSet.data.query} onChange={formik.handleChange}
                    name='variables[0].data.dataSet.data.query' 
                    required placeholder="Empty"
                    rowsMin='10'/>
                </FormControl>

              </React.Fragment>
            }
          </Grid>     
        </Grid>

        {dialog}
    </form>
  );
}