import { TemplateRef } from '@angular/core';

export interface TableColumnConfig {
    headerText?: string;
    columnId?: string;
    template?: TemplateRef<any>;
    title?: string;
    sortable?: boolean;
    sorted?: boolean;
    ascending?: boolean;
    dataFormatter?: Function;
}

