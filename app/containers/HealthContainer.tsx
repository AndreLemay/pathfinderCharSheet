import * as React from "react"
import SectionHeader from "../components/common/SectionHeader";
import InputField from "../components/common/InputField";
import CharacterSheetState, { HealthState } from "../store/types";
import { currentUpdate, maxUpdate, tempUpdate, nonlethalUpdate, drUpdate, erUpdate } from "../store/actions/healthActions";
import { connect } from "react-redux";

interface OwnProps {
    className?: string
}

interface DispatchProps {
    currentChange: (current: number) => void
    maxChange: (max: number) => void
    tempChange: (temp: number) => void
    nonlethalChange: (nonlethal: number) => void
    drChange: (dr: string) => void
    erChange: (er: string) => void
}

type HealthContainerProps = HealthState & DispatchProps & OwnProps

class HealthContainer extends React.Component<HealthContainerProps> {
    render() {
        return (
            <div className={this.props.className}>
                <SectionHeader label="Health" />
                <div className="form-row align-items-end">
                    <InputField label="Current" inputType="number" className="col" value={this.props.current} onValueChange={this.props.currentChange} />
                    <InputField label="Max" inputType="number" className="col" value={this.props.max} onValueChange={this.props.maxChange}/>
                    <InputField label="Temp" inputType="number" className="col" value={this.props.temp} onValueChange={this.props.tempChange} />
                    <InputField label="Non-Lethal" inputType="number" className="col" value={this.props.nonlethal} onValueChange={this.props.nonlethalChange} />
                </div>
                <div className="form-row align-items-end">
                    <InputField label="Damage Resistance" inputType="textarea" className="col" value={this.props.damageResistance} onValueChange={this.props.drChange} />
                    <InputField label="Energy Resistance" inputType="textarea" className="col" value={this.props.energyResistance} onValueChange={this.props.erChange} />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state: CharacterSheetState): HealthState {
    return state.health
}

function mapDispatchToProps(dispatch) {
    return {
        currentChange: current => dispatch(currentUpdate(current)),
        maxChange: max => dispatch(maxUpdate(max)),
        tempChange: temp => dispatch(tempUpdate(temp)),
        nonlethalChange: nonlethal => dispatch(nonlethalUpdate(nonlethal)),
        drChange: dr => dispatch(drUpdate(dr)),
        erChange: er => dispatch(erUpdate(er))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HealthContainer)