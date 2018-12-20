import * as React from "react"
import CharacterSheetState, { FeatState } from "../store/types";
import SectionHeader from "../components/common/SectionHeader";
import Feat from "../components/Feat";
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
                <SectionHeader label="Feats/Abilities" className="row" />
                {this.props.feats.map((feat, index) => {
                    return <IndividualFeatContainer featIndex={index} />
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