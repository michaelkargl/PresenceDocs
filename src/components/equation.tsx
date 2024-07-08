import React from "react";
import {ComputeEngine} from "@cortex-js/compute-engine";
import TeX from "@matejmazur/react-katex";
import { CalculationProps } from './calculation'

interface EquationProps extends CalculationProps {
    solveFor: string
}

export const Equation: React.FC<EquationProps> = (props) => {
    if (!props.katexEquation?.length) {
        return <></>;
    }

    const mathEngine = new ComputeEngine({
        numericPrecision: props.fractionDigits
    });

    const originalEquation = mathEngine.parse(props.katexEquation);

    mathEngine.pushScope();
    mathEngine.assign(props.variables);
    const solvedEquations = originalEquation.solve(props.solveFor);
    const filledEquation = originalEquation.subs(props.variables);

    return (<>
        <TeX math={originalEquation.latex}/>
    <br/>
    <TeX math={filledEquation.latex}/>
    <hr/>
    {solvedEquations.map(e => (<>
        <TeX>{`${props.solveFor} =`}</TeX>
        <TeX math={e.latex}/>
        <TeX> = </TeX>
        <TeX math={e.evaluate().N().numericValue.toString()} />
    <TeX>\checkmark</TeX>
    <br/>
    </>))}
    </>);
}