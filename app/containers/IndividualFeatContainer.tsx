import * as React from "react"
import { connect } from "react-redux"
import CharacterSheetState, { ValueBonus, FeatState } from "../store/types";
import Feat from "../components/Feat";
import { activeUpdate, editFeat, deleteFeat } from "../store/actions/featActions";
import { FeatInfoBundle } from "../components/FeatModal";

export interface OwnProps {
    uuid: string
    className?: string
    openFeatModal: (onSave: (state: FeatInfoBundle) => void, feat?: FeatInfoBundle) => void
}

interface StateProps {
    name: string
    description: string
    bonuses: ValueBonus[]
    active: boolean
}

interface DispatchProps {
    activeChange: (active: boolean) => void
    edit: (feat: FeatInfoBundle) => void
    delete: () => void
}

type IndividualFeatContainerProps = StateProps & DispatchProps & OwnProps

class IndividualFeatContainer extends React.Component<IndividualFeatContainerProps> {
    edit = () => {
        this.props.openFeatModal((feat: FeatInfoBundle) => {
            this.props.edit(feat)
        }, {
            name: this.props.name,
            description: this.props.description,
            bonuses: this.props.bonuses
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
    let feat = state.feats.filter(e => e.uuid === props.uuid)[0]
    return {
        name: feat.name,
        description: feat.description,
        bonuses: feat.bonuses,
        active: feat.active
    }
}

function mapDispatchToProps(dispatch, props: OwnProps): DispatchProps {
    return {
        activeChange: active => dispatch(activeUpdate(props.uuid, active)),
        edit: feat => dispatch(editFeat(props.uuid, feat)),
        delete: () => dispatch(deleteFeat(props.uuid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualFeatContainer)