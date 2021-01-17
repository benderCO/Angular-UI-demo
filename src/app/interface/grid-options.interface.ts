import { Row } from "./row.interface";

export interface GridOptions {
    name: string,
    columns?: string[],
    data?: Row[],
    values?: string[]
}
