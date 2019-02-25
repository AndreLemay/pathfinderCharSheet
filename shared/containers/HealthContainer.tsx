import * as React from "react"
import CharacterSheetState, { HealthState } from "../store/types";
import { currentUpdate, maxUpdate, tempUpdate, nonlethalUpdate, drUpdate, erUpdate } from "../store/actions/healthActions";
import { connect } from "react-redux";
import { HealthProps } from "../api/componentPropTypes";

interface OwnProps {
    className?: string
    healthSectionComponent: React.ComponentClass<HealthProps>
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
        return React.createElement(this.props.healthSectionComponent, {
            className: this.props.className,
            current: this.props.current,
            max: this.props.max,
            temp: this.props.temp,
            nonlethal: this.props.nonlethal,
            damageResistance: this.props.damageResistance,
            energyResistance: this.props.energyResistance,
            currentChange: this.props.currentChange,
            maxChange: this.props.maxChange,
            tempChange: this.props.tempChange,
            nonlethalChange: this.props.nonlethalChange,
            drChange: this.props.drChange,
            erChange: this.props.erChange
        })
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