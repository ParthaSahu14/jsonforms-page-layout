import React from "react";

export interface ILayout {
    layoutComponents: ILayoutComponents;
    layoutBreakpoints: any;
}

export interface ILayoutComponents {
    lg: ILayoutComponent[];
    md: ILayoutComponent[];
    sm: ILayoutComponent[];
    xs: ILayoutComponent[];
}

export interface ILayoutComponent {
    key: string;
    title: string;
    cssClass: string;
    comp?: string
}

