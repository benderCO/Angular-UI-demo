import { KeyValue } from "@angular/common";
import { Row } from "./row.interface";

export interface GridOptions {
    name: string,
    clickFunction?: Function,
    data?: Row[],
    xref?: KeyValue<string, string>[],
}
