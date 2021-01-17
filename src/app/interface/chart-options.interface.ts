import { KeyValue } from "@angular/common";
import { Row } from "./row.interface";

export interface ChartOptions {
    name: string,
    data?: Row[],
    xref?: KeyValue<string, string>[]
}
