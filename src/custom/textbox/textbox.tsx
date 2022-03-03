import { useEffect, useState } from "react";
import { composeWithUi, JsonSchema, Resolve, UISchemaElement } from '@jsonforms/core';
import { withJsonFormsControlProps, useJsonForms } from '@jsonforms/react';
import Dropzone , {useDropzone} from 'react-dropzone';
import { TextField } from "@mui/material";
import axios from "axios";

interface TextboxControlProps {
  data: any;
  handleChange(path: string, value: any): void;
  path: string;
  schema:any;
}

const TextboxControl = ({ data, handleChange, path, schema }: TextboxControlProps) => {
    const [textProps, setTextProps] = useState({
        value: '',
        errorMessage: '',
        errorState: false 
    });
    const [useFocusValidation, SetuseFocusValidation] = useState(false);
    const jsonforms = useJsonForms();
    const {title, validation, field } = schema;

    useEffect(() => {
        const ch = validation.filter((c:any) => c.type === 'focusOut');
        if(ch.length > 0){
            SetuseFocusValidation(true);
        }
    }, []);

    const checkValidation = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        let value = e.target.value;
        handleChange(path, value);
        if(validation && validation.length > 0){
            try {
                validation.forEach((validate: any) => {
                    switch(validate.type){
                        case "require":
                            if(validate.value){
                                if(!value){
                                    setTextProps({
                                        value,
                                        errorState: true, errorMessage: validate.message
                                    })
                                    throw new Error();
                                }else{
                                    setTextProps({
                                        value,
                                        errorState: false, errorMessage: ''
                                    });
                                }                                
                            }
                            break;
                        case "pattern":
                            if(validate.value){
                                let pattern = /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;
                                if(value.length > 0 && !pattern.test(value)){
                                    setTextProps({
                                        value,
                                        errorState: true, errorMessage: validate.message
                                    });
                                    throw new Error();
                                }
                                else{
                                    setTextProps({
                                        value,
                                        errorState: false, errorMessage: ''
                                    });
                                }
                            }
                            break;
                        case "focusOut":
                            if(e.type === 'blur'){
                                if(value === 'abc@gmail.com'){
                                    setTextProps({
                                        value,
                                        errorState: true, errorMessage: validate.message
                                    });
                                    throw new Error();
                                }
                            }
                            break;
                        default:
                            break;
                    }
                });
            } catch (error) {
                
            }

            
        }
    }

    return (
        <>
            <TextField 
            error={textProps.errorState}
            helperText={textProps.errorMessage}
            onChange={(e) => checkValidation(e)}
            id="outlined-basic" label={title} variant="outlined" autoComplete="off"
            onBlur={useFocusValidation ? checkValidation: undefined} />
        </>
        
    );
};

export default withJsonFormsControlProps(TextboxControl);