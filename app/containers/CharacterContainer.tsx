import * as React from "react"
import { connect } from "react-redux"
import CharacterSheetState, { CharacterState } from "../store/types";
import SectionHeader from "../components/common/SectionHeader"
import InputField from "../components/common/InputField"
import DropdownField from "../components/common/DropdownField"
import { Alignment, Gender, Size, AlignmentValue, GenderValue, SizeValue } from "../api/enums"
import { nameUpdate, alignmentUpdate, genderUpdate, raceUpdate, sizeUpdate } from "../store/actions/characterStateActions";

interface OwnProps {
    className?: string
}

interface DispatchProps {
    nameChange: (name: string) => void
    alignmentChange: (alignment: AlignmentValue) => void
    genderChange: (gender: GenderValue) => void
    raceChange: (race: string) => void
    sizeChange: (size: SizeValue) => void
}

type CharacterContainerProps = CharacterState & DispatchProps & OwnProps

class CharacterContainer extends React.Component<CharacterContainerProps> {
    render() {
        return (
            <div className={this.props.className}>
                <SectionHeader label="Character" />
                <InputField label="Name" className="col-4" value={this.props.name} onValueChange={this.props.nameChange} />
                <DropdownField label="Alignment" className="col-4" dropdownType={Alignment} value={this.props.alignment} onValueChange={this.props.alignmentChange} />
                <DropdownField label="Gender" className="col-4" dropdownType={Gender} value={this.props.gender} onValueChange={this.props.genderChange} />
                <InputField label="Race" className="col-6" value="Human" onValueChange={this.props.raceChange} />
                <DropdownField label="Size" className="col-6" dropdownType={Size} value={this.props.size} onValueChange={this.props.sizeChange} />
            </div>
        )
    }
}

function mapStateToProps(state: CharacterSheetState): CharacterState {
    return state.character
}

function mapDispatchToProps(dispatch): DispatchProps {
    return {
        nameChange: name => dispatch(nameUpdate(name)),
        alignmentChange: align => dispatch(alignmentUpdate(align)),
        genderChange: gender => dispatch(genderUpdate(gender)),
        raceChange: race => dispatch(raceUpdate(race)),
        sizeChange: size => dispatch(sizeUpdate(size))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterContainer)