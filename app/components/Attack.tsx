import * as React from "react"
import OutputField from "./common/OutputField";

interface AttackProps {
    name: string
    description: string
    range: string
    type: string
    damage: string
    critical: string
}

export default (props: AttackProps) => {
    return (
        <div className="form-row align-items-end">
            <OutputField
                label="Name"
                className="col-4"
                value={props.name}
            />
            <OutputField
                inputType="textarea"
                className="col-8"
                value={props.description}
            />
            <OutputField
                label="Range"
                className="col-4"
                inputType="number"
                value={props.range}
            />
            <OutputField
                label="Type"
                className="col-4"
                value={props.type}
            />
            <OutputField
                label="Damage"
                className="col-4"
                value={props.damage}
            />
            <OutputField
                label="Critical"
                className="col-4"
                value={props.critical}
            />
        </div>
    )
}