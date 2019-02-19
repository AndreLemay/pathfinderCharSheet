import * as React from "react"
import CharacterSheetState, { FeatState } from "../store/types";
import SectionHeader from "../../desktop/components/common/SectionHeader";
import { connect } from "react-redux"
import IndividualFeatContainer from "./IndividualFeatContainer";
import { FeatInfoBundle } from "../../desktop/components/FeatModal";

interface OwnProps {
    className?: string
    openFeatModal: (onSave: (state: FeatInfoBundle) => void, feat?: FeatInfoBundle) => void
}

interface StateProps {
    feats: FeatState[]
}

type FeatsContainerProps = StateProps & OwnProps

class FeatsContainer extends React.Component<FeatsContainerProps> {
    render() {
        return (
            <div className={this.props.className}>
                <SectionHeader label="Feats/Abilities" />
                {this.props.feats.map((feat, index) => {
                    return <IndividualFeatContainer key={index} uuid={feat.uuid} openFeatModal={this.props.openFeatModal} />
                })}
            </div>
        )
    }
}

function mapStateToProps(state: CharacterSheetState): StateProps {
    return {
        feats: state.feats
    }
}

export default connect(mapStateToProps)(FeatsContainer)