import { Random } from "@app/utils";

export class Color {
    public static readonly White = new Color(0, 0, 0);

    private constructor(
        public readonly red = 0,
        public readonly green = 0,
        public readonly blue = 0
    ) {
    }

    public static Random(): Color {
        return new Color(
            Random.Byte(),
            Random.Byte(),
            Random.Byte()
        )
    }

    public ToRgbCss(): string {
        return `rgb(${this.red}, ${this.green}, ${this.blue})`
    }
}