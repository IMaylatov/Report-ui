import React from 'react';
import FileInput from '../common/FileInput';

export default function ClosedXmlTemplate(props) {
  const handleFileChange = (file) => {
    props.onChange({ ...props.value, file });
  };

  return (
    <React.Fragment>
      <FileInput value={props.value.file} onChange={handleFileChange} rest={ {required: 'required'} }/>
    </React.Fragment>
  )
}