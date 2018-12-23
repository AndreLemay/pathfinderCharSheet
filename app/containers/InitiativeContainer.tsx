import * as React from "react"
import { connect } from "react-redux"
import SectionHeader from "../components/common/SectionHeader";
import OutputField from "../components/common/OutputField";
import CharacterSheetState from "../store/types";
import { getInitiative, getMiscInitiative } from "../store/selectors/initiativeSelectors";
import { getDexterityBonus } from "../store/selectors/abilityScoreSelectors";

interface OwnProps {
    className?: string
}

interface StateProps {
    initiative: number
    dexBonus: number
    miscInitiative: number
}

type InitiativeContainerProps = StateProps & OwnProps

class InitiativeContainer extends React.Component<InitiativeContainerProps> {
    render() {
        return (
            <div className={this.props.className}>
                <SectionHeader label="Initiative" />
                <OutputField className="col"
                    label="Total"
                    value={this.props.initiative}
                    inputType="number" />
                <OutputField className="col"
                    label="From DEX"
                    value={this.props.dexBonus}
                    inputType="number" />
                <OutputField className="col"
                    label="Misc"
                    value={this.props.miscInitiative}
                    inputType="number" />
            </div>
        )
    }
}

function mapStateToProps(state: CharacterSheetState): StateProps {
    return {
        initiative: getInitiative(state),
        dexBonus: getDexterityBonus(state),
        miscInitiative: getMiscInitiative(state)
    }
} 

export default connect(mapStateToProps)(InitiativeContainer)