import { Random } from "@app/utils";
import {Length} from "@app/units/length";

export class Size2d {
    constructor(
        public readonly width: Length,
        public readonly height: Length
    ) {
    }

    public static FromNumbers(width: number, height: number): Size2d {
        return this.FromLenghts(Length.FromNumber(width), Length.FromNumber(height));
    }

    public static FromLenghts(width: Length, height: Length): Size2d {
        return new Size2d(width, height);
    }

    public static Random(
        minWidth?: Length | number,
        maxWidth?: Length | number,
        minHeight?: Length | number,
        maxHeight?: Length | number
    ): Size2d {
        return new Size2d(
            Length.Random(minWidth, maxWidth),
            Length.Random(minHeight, maxHeight)
        );
    }
}