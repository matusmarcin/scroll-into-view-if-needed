import { Options as CalculateOptions } from './calculate';
export interface AnimateOptions {
    duration?: number;
    easing?: 'ease' | 'easeIn' | 'easeOut' | 'easeInOut' | 'linear';
}
export interface OffsetConfig {
    offsetTop?: number;
    offsetLeft?: number;
    offsetBottom?: number;
    offsetRight?: number;
}
export interface Offset {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
}
export interface Options extends CalculateOptions {
    duration?: number;
    easing?: 'ease' | 'easeIn' | 'easeOut' | 'easeInOut' | 'linear';
    onDone?: Function;
}
export default function scrollIntoViewIfNeeded(target: Element, options: boolean | Options, animateOptions?: AnimateOptions, finalElement?: Element, offsetOptions?: OffsetConfig): void;
