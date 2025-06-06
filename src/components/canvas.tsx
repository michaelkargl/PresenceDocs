import React, {useRef, useEffect} from 'react'
import {Size2d} from "../units/size2d";

type CanvasReadyFunc = (
    context: CanvasRenderingContext2D,
    size: Size2d
) => void;

interface CanvasProps {
    width?: string | number;
    height?: string | number;
    onCanvasReadyFn?: CanvasReadyFunc;
    children?: React.ReactNode;
}

export const Canvas: React.FC<CanvasProps> = (props) => {
    const canvasRef: React.RefObject<HTMLCanvasElement> = useRef(null);

    /**
     * Resizes an HTML element by modifying its style properties
     * @param {HTMLElement} element
     * @param {number | string} width
     * @param {number | string} height
     * @returns an object containing the new width and height of the elements recalculated bounding box
     * @example resizeElement(document, 100, 200)
     * @example resizeElement(document, "100px", "50%")
     */
    const resizeElement = (
        element: HTMLElement,
        width: number | string,
        height: number | string
    ) => {
        console.group("Resizing element %o to %s x %s", element, width, height);
        element.style.width = width.toString();
        element.style.height = height.toString();

        const elementSize = element.getBoundingClientRect();
        console.debug("New size: %ipx x %ipx", elementSize.width, elementSize.height);
        console.groupEnd();

        return elementSize;
    }

    useEffect(() => {
        console.debug("Component mounted...");
        const canvas: HTMLCanvasElement = canvasRef.current;

        // now that the parents are rendered / its sizes have stabilized, we can size the canvas
        const canvasSize: DOMRect = resizeElement(canvas, props.width, props.height);
        props.onCanvasReadyFn(
            canvas.getContext('2d'),
            Size2d.FromNumbers(canvasSize.width, canvasSize.height))
    }, [props.onCanvasReadyFn]);

    return (<>
        <canvas ref={canvasRef}
                style={{
                    width: props.width,
                    height: props.height
                }}></canvas>
    </>);

};