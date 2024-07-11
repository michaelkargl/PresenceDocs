import { Random } from "@app/utils";

export class Length {
    public static readonly Zero = new Length(0);

    private constructor(public readonly pixel: number) {
    }

    public static FromNumber(num: number): Length {
        return num === 0
            ? this.Zero
            : new Length(num);
    }

    public static Random(
        min?: Length | number,
        max?: Length | number
    ): Length {
        const minPixel = typeof min === 'number' ? min : min?.pixel;
        const maxPixel = typeof max === 'number' ? max : max?.pixel;
        const pixels = Random.Number(minPixel, maxPixel);
        return new Length(pixels);
    }
}