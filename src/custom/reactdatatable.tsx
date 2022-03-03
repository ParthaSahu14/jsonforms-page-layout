import { composeWithUi, JsonSchema, Resolve, UISchemaElement } from '@jsonforms/core';
import { withJsonFormsControlProps, useJsonForms } from '@jsonforms/react';
import { ColumnDirective, ColumnsDirective, Edit, EditSettingsModel, Filter, GridComponent, Group, Inject, Page, PageSettingsModel, Sort, ToolbarItems } from '@syncfusion/ej2-react-grids';
import './custom.css';
import schema from '../schema.json';
import uischema from '../uischema.json';

interface GridControlProps {
  data: any;
  handleChange(path: string, value: any): void;
  path: string
}
const pageSettings: PageSettingsModel = { pageSize: 6 }

const datachanged =(state: any) => {
    console.log(state);
}

const editOptions: EditSettingsModel = {allowEditing: true, allowAdding: true};
const toolbarOptions: ToolbarItems[] = ['Add', 'Edit', 'Update'];

const GridControl = ({ data, handleChange, path }: GridControlProps) => {
    const jsonforms = useJsonForms();
    
    
    const rootData = jsonforms.core?.data;
    const rootSchema = jsonforms.core?.uischema as JsonSchema;
    //console.log(rootSchema);
    const resolveData = Resolve.data(rootData, path);
    //console.log(resolveData);
    const sc: JsonSchema = schema;
    const resolveSchema = Resolve.schema(sc, path, rootSchema);
    //console.log(resolveSchema);
    return (
        <div>
            <GridComponent dataSource={data} allowPaging={true} pageSettings={ pageSettings } 
            editSettings={editOptions}
            toolbar={toolbarOptions}
            dataSourceChanged={datachanged}>
                    <ColumnsDirective>
                        <ColumnDirective field='OrderID' width='100' textAlign="Right"/>
                        <ColumnDirective field='CustomerID' width='100'/>
                        <ColumnDirective field='EmployeeID' width='100' textAlign="Right"/>
                        <ColumnDirective field='Freight' width='100' format="C2" textAlign="Right"/>
                        <ColumnDirective field='ShipCountry' width='100'/>
                    </ColumnsDirective>
                    <Inject services={[Page, Sort, Filter, Group, Edit]} />
            </GridComponent>
    </div>
    );
};

export default withJsonFormsControlProps(GridControl);