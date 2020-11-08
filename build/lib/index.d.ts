export interface UIOptions {
    width: number;
    wrap?: boolean;
    rows?: string[];
}
interface Column {
    text: string;
    width?: number;
    align?: 'right' | 'left' | 'center';
    padding: number[];
    border?: boolean;
}
interface ColumnArray extends Array<Column> {
    span: boolean;
}
interface Line {
    hidden?: boolean;
    text: string;
    span?: boolean;
}
interface Mixin {
    stringWidth: Function;
    stripAnsi: Function;
    wrap: Function;
}
export declare class UI {
    width: number;
    wrap: boolean;
    rows: ColumnArray[];
    constructor(opts: UIOptions);
    span(...args: ColumnArray): void;
    resetOutput(): void;
    div(...args: (Column | string)[]): ColumnArray;
    private shouldApplyLayoutDSL;
    private applyLayoutDSL;
    private colFromString;
    private measurePadding;
    toString(): string;
    rowToString(row: ColumnArray, lines: Line[]): Line[];
    private renderInline;
    private rasterize;
    private negatePadding;
    private columnWidths;
}
export declare function cliui(opts: Partial<UIOptions>, _mixin: Mixin): UI;
export {};
