import React, { useState, useEffect} from 'react';
import Report from './Report';
import { getReportById } from '../ReportAPI';

export default function EditReport() {
  const [value, setValue] = useState(null);

  useEffect(() => {
    getReportById(0)
      .then(response => setValue(response));
  }, []);

  return (
    <React.Fragment>
      {value &&
        <Report value={value}/>
      }
    </React.Fragment>
  );
}