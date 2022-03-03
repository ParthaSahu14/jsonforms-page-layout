import {
    JsonSchema,
    ControlProps,
    isBooleanControl,
    RankedTester,
    rankWith,
    schemaMatches,
    and,
  } from '@jsonforms/core';
  import { withJsonFormsControlProps } from '@jsonforms/react';
  import { Unwrapped } from '@jsonforms/material-renderers';
  import { Grid, Typography } from '@mui/material';
  const { MaterialBooleanControl } = Unwrapped;
  
  type JsonSchemaWithPrice = JsonSchema & { price: number };
  
  export const checkBoxWithPriceControl = (props: ControlProps) => {
    const schema = props.schema as JsonSchemaWithPrice;
    const label = `${props.label} (${schema.price})`;
    return (
      <Grid container>
        <Grid item xs={12}>
          <MaterialBooleanControl {...props} label={label} />
        </Grid>
        {schema.price > 50 && (
          <Grid item xs={12}>
            <Typography>Shipping is free!</Typography>
          </Grid>
        )}
      </Grid>
    );
  };
  
  export const checkBoxWithPriceControlTester: RankedTester = rankWith(
    3,
    and(
      isBooleanControl,
      schemaMatches((schema) => schema.hasOwnProperty('price'))
    )
  );
  export default withJsonFormsControlProps(checkBoxWithPriceControl);