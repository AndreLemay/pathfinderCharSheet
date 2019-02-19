import * as React from "react"
import { connect } from "react-redux"
import SectionHeader from "../../desktop/components/common/SectionHeader";
import InputField from "../../desktop/components/common/InputField";
import CharacterSheetState from "../store/types";
import { nameUpdate, descriptionUpdate, checkPenaltyUpdate, acUpdate } from "../store/actions/shieldActions";

interface OwnProps {
    className?: string
}

interface StateProps {
    name: string
    description: string
    checkPenalty: number
    ac: number
}

interface DispatchProps {
    nameChange: (name: string) => void
    descriptionChange: (desc: string) => void
    checkPenaltyChange: (penalty: number) => void
    acChange: (ac: number) => void
}

type ShieldContainerProps = StateProps & DispatchProps & OwnProps

class ShieldContainer extends React.Component<ShieldContainerProps> {
    render() {
        return (
            <div className={this.props.className}>
                <SectionHeader label="Shield" />
                <div className="form-row align-items-end">
                    <InputField 
                        label="Name"
                        className="col-12"
                        value={this.props.name}
                        onValueChange={this.props.nameChange} />
                    
                    <InputField 
                        inputType="textarea"
                        className="col"
                        value={this.props.description}
                        onValueChange={this.props.descriptionChange} />
                    
                </div>
                <div className="form-row align-items-end">
                    <InputField 
                        label="Check Penalty"
                        className="col"
                        inputType="number"
                        value={this.props.checkPenalty}
                        onValueChange={this.props.checkPenaltyChange} />
                    <InputField 
                        label="AC Bonus"
                        className="col"
                        inputType="number"
                        value={this.props.ac}
                        onValueChange={this.props.acChange} />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state: CharacterSheetState): StateProps {
    return {
        name: state.shield.name,
        description: state.shield.description,
        checkPenalty: state.shield.checkPenalty,
        ac: state.shield.ac
    }
}

function mapDispatchToProps(dispatch): DispatchProps {
    return {
        nameChange: name => dispatch(nameUpdate(name)),
        descriptionChange: desc => dispatch(descriptionUpdate(desc)),
        checkPenaltyChange: penalty => dispatch(checkPenaltyUpdate(penalty)),
        acChange: ac => dispatch(acUpdate(ac))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShieldContainer)