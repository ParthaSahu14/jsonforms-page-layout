import { useEffect, useState } from "react";
import { composeWithUi, JsonSchema, Resolve, UISchemaElement } from '@jsonforms/core';
import { withJsonFormsControlProps, useJsonForms } from '@jsonforms/react';
import { MenuItem, Select } from '@mui/material';
import { ColumnDirective, ColumnsDirective, Edit, EditSettingsModel, Filter, GridComponent, Group, Inject, Page, PageSettingsModel, Sort, ToolbarItems } from '@syncfusion/ej2-react-grids';
import axios from "axios";

interface DropdownControlProps {
  data: any;
  handleChange(path: string, value: any): void;
  path: string;
  schema:any;
}

const DropdownControl = ({ data, handleChange, path,  schema }: DropdownControlProps) => {
    const [option, setoption] = useState([]);
    const jsonforms = useJsonForms();
    const {datasource, name, dependsOn, field } = schema;
    useEffect(() => {   
        console.log(jsonforms.core?.data[field]);
        if(datasource === 'inhouse'){
            if(!dependsOn){
                axios.post('http://localhost:3001/getdata', 
                {
                    "collection": name
                }).then(res => {
                    //console.log(res.data);
                    setoption(res.data);
                });
            }
            else{
                const filterVal = jsonforms.core?.data[dependsOn.field];
                console.log(filterVal);
                const reqBody = {
                    "collection": name,
                    "filter": {
                        "key": dependsOn.value,
                        "value" : filterVal
                    }
                };
                axios.post('http://localhost:3001/getdata', reqBody).then(res => {
                    //console.log(res.data);
                    setoption(res.data);
                });
            }
        }
    }, [jsonforms.core?.data[field], jsonforms.core?.data[dependsOn?.field]]);

    return (
        <>
            {option ? 
                    <div>
                    <Select
                       value={jsonforms.core?.data[field]}
                       labelId="demo-simple-select-label"
                       id="demo-simple-select"
                       onChange={(e) => {
                            handleChange(path, e.target.value);
                       }}>
                        
                    {option.map((item:any) => (
                            <MenuItem
                            key={item.id}
                            value={item.id}
                            >
                            {item.name}
                            </MenuItem>
                        ))}
                   </Select>
               </div>
            : null} 
        </>
        
    );
};

export default withJsonFormsControlProps(DropdownControl);