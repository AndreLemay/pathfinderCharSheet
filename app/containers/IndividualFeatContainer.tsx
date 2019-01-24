import * as React from "react"
import { connect } from "react-redux"
import CharacterSheetState, { ValueBonus, FeatState } from "../store/types";
import Feat from "../components/Feat";
import { activeUpdate, editFeat, deleteFeat } from "../store/actions/featActions";

export interface OwnProps {
    featIndex: number
    className?: string
    openFeatModal: (onSave: (state: FeatState) => void, feat?: FeatState) => void
}

interface StateProps {
    name: string
    description: string
    bonuses: ValueBonus[]
    active: boolean
}

interface DispatchProps {
    activeChange: (active: boolean) => void
    edit: (feat: FeatState) => void
    delete: () => void
}

type IndividualFeatContainerProps = StateProps & DispatchProps & OwnProps

class IndividualFeatContainer extends React.Component<IndividualFeatContainerProps> {
    edit = () => {
        this.props.openFeatModal((feat: FeatState) => {
            this.props.edit(feat)
        }, {
            name: this.props.name,
            description: this.props.description,
            bonuses: this.props.bonuses,
            active: this.props.active
        })
    }
    render() {
        return (
            <Feat className={this.props.className}
                name={this.props.name}
                description={this.props.description}
                bonuses={this.props.bonuses}
                active={this.props.active}
                onActiveChange={this.props.activeChange}
                onEdit={this.edit}
                onDelete={this.props.delete} />
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
        activeChange: active => dispatch(activeUpdate(active, props.featIndex)),
        edit: feat => dispatch(editFeat(feat, props.featIndex)),
        delete: () => dispatch(deleteFeat(props.featIndex))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualFeatContainer)