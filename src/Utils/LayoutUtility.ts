import React, { FC } from "react";

export const getReactComponent = (componentName: string): any => {
    let component: any = null;
    switch (componentName) {
        case "RegistrationComponent":
            component = React.lazy(() => import('../Forms/RegistrationForm/Registration'));
            break;

        default:
            break;
    }
    return component;
}