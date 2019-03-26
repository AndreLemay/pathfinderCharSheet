import * as React from "react"
import CharacterSheetState from "../store/types";
import { connect } from "react-redux"
import { FeatInfoBundle, FeatsSectionProps } from "../api/componentPropTypes";

interface OwnProps {
    className?: string
    openFeatModal: (onSave: (state: FeatInfoBundle) => void, feat?: FeatInfoBundle) => void
    featsSectionComponent: React.ComponentClass<FeatsSectionProps>
}

interface StateProps {
    featIds: string[]
}

type FeatsContainerProps = StateProps & OwnProps

class FeatsContainer extends React.Component<FeatsContainerProps> {
    render() {
        return React.createElement(this.props.featsSectionComponent, {
            className: this.props.className,
            featIds: this.props.featIds,
            openFeatModal: this.props.openFeatModal
        })
    }
}

function mapStateToProps(state: CharacterSheetState): StateProps {
    return {
        featIds: state.feats.map(f => f.uuid)
    }
}

export default connect(mapStateToProps)(FeatsContainer)