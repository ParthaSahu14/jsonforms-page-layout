import { useEffect, useState } from "react";
import { composeWithUi, JsonSchema, Resolve, UISchemaElement } from '@jsonforms/core';
import { withJsonFormsControlProps, useJsonForms } from '@jsonforms/react';
import Dropzone , {useDropzone} from 'react-dropzone';

interface FileuploadControlProps {
  data: any;
  handleChange(path: string, value: any): void;
  path: string;
  schema:any;
}

const FileuploadControl = ({ data, handleChange, path,  schema }: FileuploadControlProps) => {
    const [fileNames, setFileNames] = useState([]);

    return (
        <>
        <Dropzone onDrop={ (acceptedFiles:any) => {
            console.log(acceptedFiles);
            setFileNames(acceptedFiles.map((file:any) => file.name));
            handleChange(path, acceptedFiles);
        }}>
        {({getRootProps, getInputProps}) => (
            <section>
            <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            </section>
        )}
        </Dropzone>
        <div>
            <strong>Files:</strong>
            <ul>
            {fileNames.map(fileName => (
                <li key={fileName}>{fileName}</li>
            ))}
            </ul>
      </div>
        </>
        
    );
};

export default withJsonFormsControlProps(FileuploadControl);