export class Random {

    public static Number(min?: number, max?: number): number {
        min ??= Number.MIN_VALUE;
        max ??= Number.MAX_VALUE;
        const num = Math.random() * 10 ** 16;

        return min + (num % max);
    };

    public static Byte(): number {
        return this.Number(0, 255);
    }
}