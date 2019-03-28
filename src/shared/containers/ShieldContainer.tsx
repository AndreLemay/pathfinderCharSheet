import * as React from "react"
import { connect } from "react-redux"
import CharacterSheetState from "../store/types";
import { nameUpdate, descriptionUpdate, checkPenaltyUpdate, acUpdate } from "../store/actions/shieldActions";
import { ShieldProps } from "../api/componentPropTypes";

interface OwnProps {
    className?: string
    shieldComponent: React.SFC<ShieldProps>
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
        return React.createElement(this.props.shieldComponent, {
            className: this.props.className,
            name: this.props.name,
            description: this.props.description,
            checkPenalty: this.props.checkPenalty,
            ac: this.props.ac,
            nameChange: this.props.nameChange,
            descriptionChange: this.props.descriptionChange,
            checkPenaltyChange: this.props.checkPenaltyChange,
            acChange: this.props.acChange
        })
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