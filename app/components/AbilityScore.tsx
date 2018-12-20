import * as React from "react"
import InputField from "./common/InputField";
import OutputField from "./common/OutputField";

interface AbilityScoreProps {
    label: string
    baseChange: (base: number) => void
    base: number
    additional: number
    bonus: number
}

export default (props: AbilityScoreProps) => {
    return (
        <div className="form-row align-items-end">
            <div className="col-2 ability-title"><label>{props.label}</label></div>
            <InputField label="Base" className="col" inputType="number" value={props.base} onValueChange={props.baseChange} />
            <OutputField label="Additional" className="col" inputType="number" value={props.additional} />
            <OutputField label="Bonus" className="col" inputType="number" value={props.bonus} />
        </div>
    )
}