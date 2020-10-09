import React, { useState, useEffect}  from 'react';
import DataSource from './DataSource';
import { useParams } from "react-router-dom";
import { getDataSourcetById } from './DataSourceAPI';

export default function EditDataSource(props) {
  const [dataSource, setDataSource] = useState(null);
  const [isLoadedDataSource, setIsLoadedDataSource] = useState(false);
  const { dataSourceId } = useParams();

  useEffect(() => {
    getDataSourcetById(dataSourceId)
      .then(dataSource => {
        setDataSource(dataSource);
        setIsLoadedDataSource(true);
      });
  }, [dataSourceId]);

  return (
    <React.Fragment>
      {isLoadedDataSource &&
        <DataSource value={dataSource}/>
      }
    </React.Fragment>
  );
}