import React, { useState, useEffect } from 'react';
import { 
  Select,
  Button
} from '@material-ui/core';
import { getDataSources } from './DataSourceAPI';
import MenuItem from '@material-ui/core/MenuItem';
import CloseDialogTitle from '../common/CloseDialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import { useFormik } from 'formik';

const validate = (report, preValue, values) => {
  const errors = {};

  if (report.dataSources.some(d => d !== preValue && d.name === values.name)) {
    errors.name = 'Источник данных уже добавлен в отчет';
  }

  return errors;
}

export default function SelectDataSource(props) {
  const [dataSources, setDataSources] = useState([]);
  const [isLoadedDataSources, setLoadedDataSources] = useState(false);

  const formik = useFormik({
    initialValues: {
      dataSourceId: props.value?.id ?? ''
    },
    validate: values => validate(props.report, props.value, values),
    onSubmit: values => {
      props.onSave(dataSources.find(x => x.id === values.dataSourceId));
    },
  });

  useEffect(() => {
    getDataSources()
      .then(res => {
        setDataSources(res);
        setLoadedDataSources(true);
      });
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <CloseDialogTitle onClose={props.onCancel}>Выберите источник данных</CloseDialogTitle>
      {isLoadedDataSources &&       
        <DialogContent>
          <FormControl fullWidth>
            <Select
              label="Источник данных"
              required 
              value={formik.values.dataSourceId}
              onChange={(id) => formik.setFieldValue('dataSourceId', id.target.value)}
              name='dataSource'
            >
              {dataSources.map((dataSource) => (
                <MenuItem key={dataSource.id} value={dataSource.id}>
                  {dataSource.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
      }
      <DialogActions>
        <Button type="submit" color='primary'>OK</Button>
      </DialogActions>
    </form>
  );
}