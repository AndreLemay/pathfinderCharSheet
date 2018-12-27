import * as React from "react"
import CharacterSheetState, { FeatState } from "../store/types";
import SectionHeader from "../components/common/SectionHeader";
import { connect } from "react-redux"
import IndividualFeatContainer from "./IndividualFeatContainer";

interface OwnProps {
    className?: string
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
                {this.props.feats.map((_, index) => {
                    return <IndividualFeatContainer key={index} featIndex={index} />
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