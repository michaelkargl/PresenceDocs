import {ComputeEngine} from "@cortex-js/compute-engine";
import TeX from '@matejmazur/react-katex';
import React from 'react';

type Variables = {
    [variable: string]: number
}

interface VariableListProps {
    variables: Variables
}

const VariableList: React.FC<VariableListProps> = (props) => (
    <pre>
        Variables: <br/>{
        Object.entries(props.variables).map(entry => <>
            <span>{entry[0]}: {entry[1]}</span><br/>
        </>)
    }</pre>
);

interface EquationProps {
    katexEquation: string,
    fractionDigits?: number,
    debug?: boolean,
    variables: Variables;
}

export const Equation: React.FC<EquationProps> = (props) => {
    const separator = <>&nbsp;&nbsp; = &nbsp;&nbsp;</>;
    const mathEngine = new ComputeEngine({
        numericPrecision: props.fractionDigits
    });
    mathEngine.pushScope();

    const expression = mathEngine.parse(props.katexEquation, {
        canonical: undefined
    });
    const symbolicEvaluatedExpression = expression.evaluate({numericMode: false});
    const symbolicEvaluatedExpresionSubstituted = symbolicEvaluatedExpression.subs(props.variables);

    const simplifiedSymbolicEvaluatedExpression = symbolicEvaluatedExpression.simplify();
    const simplifiedSymbolicEvaluatedExpressionSubstituted = simplifiedSymbolicEvaluatedExpression.subs(props.variables);

    const simplestNumericExpression = symbolicEvaluatedExpresionSubstituted.simplify();

    const equationFunc = simplifiedSymbolicEvaluatedExpression.compile();

    const rawResult: number = equationFunc(props.variables);
    const result = rawResult.toFixed(props.fractionDigits);

    return (<>
        <VariableList variables={props.variables}/>
        <TeX math={props.katexEquation}/>
        {separator}
        <TeX math={expression.latex}/>
        {separator}
        <TeX math={symbolicEvaluatedExpression.latex}/>
        {separator}
        <TeX math={simplifiedSymbolicEvaluatedExpression.latex}/>
        {separator}
        <TeX math={simplifiedSymbolicEvaluatedExpressionSubstituted.latex}/>
        {separator}
        <TeX math={simplestNumericExpression.latex}/>
        {separator}
        <TeX math={rawResult.toString()} />
        <br/>{separator}
        <TeX math={`${result} \\checkmark`} />
    </>);
}