export interface Offset {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
}
export interface ScrollCoordinates {
    scrollLeft: number;
    scrollTop: number;
}
export declare type handleScrollCallback = (parent: HTMLElement, coordinates: ScrollCoordinates, config: Options) => void;
export interface Options {
    handleScroll?: handleScrollCallback;
    boundary?: Element;
    centerIfNeeded?: boolean;
    offset?: Offset;
    onDone?: Function;
    duration?: number;
}
export default function calculate(target: Element, options: Options): void;
