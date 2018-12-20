import * as React from "react"
import { connect } from "react-redux"
import CharacterSheetState, { ValueBonus } from "../store/types";
import Feat from "../components/Feat";
import { activeUpdate } from "../store/actions/featActions";

export interface OwnProps {
    featIndex: number
}

interface StateProps {
    name: string
    description: string
    bonuses: ValueBonus[]
    active: boolean
}

interface DispatchProps {
    activeChange: (active: boolean) => void
}

type IndividualFeatContainerProps = StateProps & DispatchProps & OwnProps

class IndividualFeatContainer extends React.Component<IndividualFeatContainerProps> {
    render() {
        return (
            <Feat name={this.props.name}
                description={this.props.description}
                bonuses={this.props.bonuses}
                active={this.props.active}
                onActiveChange={this.props.activeChange} />
        )
    }
}

function mapStateToProps(state: CharacterSheetState, props: OwnProps): StateProps {
    return {
        name: state.feats[props.featIndex].name,
        description: state.feats[props.featIndex].description,
        bonuses: state.feats[props.featIndex].bonuses,
        active: state.feats[props.featIndex].active
    }
}

function mapDispatchToProps(dispatch, props: OwnProps): DispatchProps {
    return {
        activeChange: active => dispatch(activeUpdate(active, props))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualFeatContainer)