import * as React from "react"
import OutputField from "./common/OutputField";
import { ValueBonus } from "../store/types";

interface FeatProps {
    className?: string
    name: string
    description: string
    bonuses: ValueBonus[]
    active: boolean
    onActiveChange: (active: boolean) => void
}

export default function Feat(props: FeatProps) {
    function activeChange(event: React.ChangeEvent<HTMLInputElement>) {
        props.onActiveChange(event.currentTarget.checked)
    }

    return (
        <div className={`feat-name ${props.className}`}>
            <div className="form-row align-items-center">
                <div className="col-3"><label>Name</label></div>
                <div className="col-6">
                    <OutputField className="form-control-plaintext" value={props.name} />
                </div>
                <div className="col-3">
                    <label className="switch">
                        <input type="checkbox" checked={props.active} onChange={activeChange} />
                        <span className="slider round"></span>
                        <span className="absolute-no">Off</span>
                    </label>
                </div>
            </div>
            <div className="form-row align-items-center">
                <div className="col-3"><label>Properties</label></div>
                <div className="col-9">
                    <OutputField inputType="textarea" value={
                        props.bonuses.map((bonus) => { return bonus.asString(true) }) + "\n" + props.description} />
                </div>
            </div>
        </div>
    )
}