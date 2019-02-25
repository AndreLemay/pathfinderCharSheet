import * as React from "react"
import { HealthProps } from "../../shared/api/componentPropTypes";
import SectionHeader from "./common/SectionHeader";
import InputField from "./common/InputField";

export default function HealthSection(props: HealthProps) {
    return (
        <div className={props.className}>
            <SectionHeader label="Health" />
            <InputField label="Current" inputType="number" className="col-3"
                min={0}
                value={props.current}
                onValueChange={props.currentChange} />
            <InputField label="Max" inputType="number" className="col-3"
                min={1}
                value={props.max}
                onValueChange={props.maxChange} />
            <InputField label="Temp" inputType="number" className="col-3"
                min={0}
                value={props.temp}
                onValueChange={props.tempChange} />
            <InputField label="Non-Lethal" inputType="number" className="col-3"
                min={0}
                value={props.nonlethal}
                onValueChange={props.nonlethalChange} />
            <InputField label="Damage Resistance" inputType="textarea" className="col-6" value={props.damageResistance} onValueChange={props.drChange} />
            <InputField label="Energy Resistance" inputType="textarea" className="col-6" value={props.energyResistance} onValueChange={props.erChange} />
        </div>
    )
}