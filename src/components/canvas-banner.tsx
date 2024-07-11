// @ts-ignore
import {MDXComponents} from "@mdx-js/react/lib";
import React, {useEffect, useRef, useState} from 'react'
import {MDXProvider} from '@mdx-js/react'
import {Canvas} from '@components/canvas'
import {Random} from "@app/utils";
import {Color, Length, Size2d} from "@app/units";

interface CanvasBannerProps {
    fontColor?: string;
    marginTop?: string | number,
    marginBottom?: string | number,
    padding?: string | number;
    canvasBlurRadius?: number;
    canvasBrightnessPercent?: number;
    canvasSaturation?: number;
    squareCount?: number;
    children?: React.ReactNode;
}

/**
 * Draws a colorful background and overlays some text.
 * @param props no direct prop input required.
 * @example <CanvasBanner>text</CanvasBanner>
 */
const CanvasBanner: React.FC<CanvasBannerProps> = (props) => {
    const [
        fontColor,
        padding,
        marginTop,
        marginBottom,
        canvasBlurRadius,
        canvasBrightnessPercent,
        canvasSaturation,
        squareCount
    ] = [
        props.fontColor ?? "white",
        props.padding ?? "4rem",
        props.marginTop ?? '4rem',
        props.marginBottom ?? '2.5rem',
        props.canvasBlurRadius ?? 3,
        props.canvasBrightnessPercent ?? 0.5,
        props.canvasSaturation ?? 0.3,
        props.squareCount ?? 50
    ];

    /**
     * Draws a rectangle to the given canvas
     * @param {*} canvas the 2d canvas context to draw onto
     * @param {number} positionX the top-left corner X position
     * @param {number} positionY the top-left corner Y position
     * @param {number} width the width in pixels
     * @param {number} height the height in pixels
     */
    const drawRectangle = (
        canvas: CanvasRenderingContext2D,
        positionX: number,
        positionY: number,
        size: Size2d,
        color: Color
    ) => {
        canvas.fillStyle = color.ToRgbCss();
        canvas.fillRect(positionX, positionY, size.width.pixel, size.height.pixel);
    }

    /**
     * Draws a single square of random size and color onto the provided canvas
     * @param {*} canvasContext the 2d canvas context to draw onto
     * @param {number} canvasWidth
     * @param {number} canvasHeight
     */
    const drawRandomSquare = (
        canvasContext: CanvasRenderingContext2D,
        canvasSize: Size2d
    ) => {
        const [
            positionX,
            positionY,
            color
        ] = [
            Random.Number(0, canvasSize.width.pixel),
            Random.Number(0, canvasSize.height.pixel),
            Color.Random()
        ];

        const rectangleSize = Size2d.Random(Length.Zero, canvasSize.width);
        drawRectangle(
            canvasContext,
            positionX, positionY,
            rectangleSize,
            color
        );
    }

    /**
     * Draws a number of random squares onto the given canvas
     * @param {*} canvasContext the 2d canvas context to draw onto
     * @param {number} canvasWidth the x bounardy of the canvas in pixels
     * @param {number} canvasHeight the y boundary of the canvas in pixels
     * @param {number} count the amount of squares to render
     */
    const drawRandomSquares = (
        canvasContext: CanvasRenderingContext2D,
        canvasSize: Size2d,
        count: number
    ) => {
        for (let i = 0; i < count; i++) {
            drawRandomSquare(
                canvasContext,
                canvasSize);
        }
    }

    /**
     * draws the banner onto the given canvas
     * @param {*} canvasContext  the 2d canvas context to draw onto
     * @param {number} canvasWidth the x bounardy of the canvas in pixels
     * @param {number} canvasHeight the y boundary of the canvas in pixels
     */
    const draw = (
        canvasContext: CanvasRenderingContext2D,
        canvasSize: Size2d
    ) => {
        drawRectangle(canvasContext, 0, 0, canvasSize, Color.White);
        drawRandomSquares(canvasContext, canvasSize, squareCount);
    }

    const childRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
    const [childSize, setChildSize] = useState([0, 0]);

    useEffect(() => {
        console.log("useEffect: %o", childRef);
        const childBoundingBox = childRef.current.getBoundingClientRect();
        const updateChildSize = childSize[0] !== childBoundingBox.width || childSize[1] === childBoundingBox.height;
        if (updateChildSize) {
            setChildSize([
                childBoundingBox.width,
                childBoundingBox.height
            ]);
        }
    }, [childRef]);

    return (
        <div style={{height: "100%", position: "relative", marginTop, marginBottom}}>
            {/* overlay child elements ontop of the canvas */}
            <div ref={childRef} style={{
                position: "absolute",
                boxSizing: 'border-box',
                zIndex: 1,
                color: fontColor,
                padding: props.padding
            }}>
                {props.children}
            </div>


            {/* distort the canvas image to make text easier to read */}
            <div style={{
                filter: `
                blur(${canvasBlurRadius}px)
                brightness(${canvasBrightnessPercent})
                saturate(${canvasSaturation})`
            }}>
                <Canvas width='100%'
                        height={childSize[1]}
                        onCanvasReadyFn={draw}></Canvas>
            </div>
        </div>
    );
}


// TODO: check out v2 component injections: https://mdxjs.com/guides/injecting-components/
const decoratedComponent: React.FC<CanvasBannerProps> = (props) => (
    <MDXProvider components={{
        CanvasBanner
    } satisfies MDXComponents}>
        <CanvasBanner {...props}>{props.children}</CanvasBanner>
    </MDXProvider>
);

export default decoratedComponent;