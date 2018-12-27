import * as React from "react"
import { connect } from "react-redux"
import { ArmourTypeValue, ArmourType } from "../api/enums";
import SectionHeader from "../components/common/SectionHeader";
import InputField from "../components/common/InputField";
import DropdownField from "../components/common/DropdownField";
import CharacterSheetState from "../store/types";
import { nameUpdate, descriptionUpdate, typeUpdate, maxSpeedUpdate, maxDexUpdate, checkPenaltyUpdate, acUpdate } from "../store/actions/armourActions";

interface OwnProps {
    className?: string
}

interface StateProps {
    name: string
    description: string
    type: ArmourTypeValue
    maxSpeed: number
    maxDex: number
    checkPenalty: number
    ac: number
}

interface DispatchProps {
    nameChange: (name: string) => void
    descriptionChange: (description: string) => void
    typeChange: (type: ArmourTypeValue) => void
    maxSpeedChange: (maxSpeed: number) => void
    maxDexChange: (maxDex: number) => void
    checkPenaltyChange: (checkPenalty: number) => void
    acChange: (ac: number) => void
}

type ArmourContainerProps = StateProps & DispatchProps & OwnProps

class ArmourContainer extends React.Component<ArmourContainerProps> {
    render() {
        return (
            <div className={this.props.className}>
                <SectionHeader label="Armour" />
                <div className="form-row align-items-end">
                    <InputField 
                        label="Name"
                        className="col-12"
                        value={this.props.name}
                        onValueChange={this.props.nameChange} />                    
                    <InputField 
                        className="col-12"
                        inputType="textarea"
                        value={this.props.description}
                        onValueChange={this.props.descriptionChange} />                    
                </div>
                <div className="form-row align-items-end">
                    <DropdownField 
                        label="Type"
                        className="col"
                        dropdownType={ArmourType}
                        value={this.props.type}
                        onValueChange={this.props.typeChange} />
                    <InputField 
                        label="Max Speed"
                        className="col"
                        inputType="number"
                        min={0}
                        step={5}
                        value={this.props.maxSpeed}
                        onValueChange={this.props.maxSpeedChange} />
                    <InputField 
                        label="Max DEX"
                        className="col"
                        inputType="number"
                        min={0}
                        value={this.props.maxDex}
                        onValueChange={this.props.maxDexChange} />
                </div>
                <div className="form-row align-items-end">
                    <InputField 
                        label="Check Penalty"
                        className="col"
                        inputType="number"
                        max={0}
                        value={this.props.checkPenalty}
                        onValueChange={this.props.checkPenaltyChange} />
                    <InputField 
                        label="AC Bonus"
                        className="col"
                        inputType="number"
                        min={0}
                        value={this.props.ac}
                        onValueChange={this.props.acChange} />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state: CharacterSheetState): StateProps {
    return {
        name: state.armour.name,
        description: state.armour.description,
        type: state.armour.type,
        maxSpeed: state.armour.maxSpeed,
        maxDex: state.armour.maxDex,
        checkPenalty: state.armour.checkPenalty,
        ac: state.armour.ac
    }
}

function mapDispatchToProps(dispatch): DispatchProps {
    return {
        nameChange: name => dispatch(nameUpdate(name)),
        descriptionChange: desc => dispatch(descriptionUpdate(desc)),
        typeChange: type => dispatch(typeUpdate(type)),
        maxSpeedChange: speed => dispatch(maxSpeedUpdate(speed)),
        maxDexChange: dex => dispatch(maxDexUpdate(dex)),
        checkPenaltyChange: penalty => dispatch(checkPenaltyUpdate(penalty)),
        acChange: ac => dispatch(acUpdate(ac))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArmourContainer)