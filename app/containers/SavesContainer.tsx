import * as React from "react"
import CharacterSheetState, { SaveState } from "../store/types";
import SectionHeader from "../components/common/SectionHeader";
import OutputField from "../components/common/OutputField";
import InputField from "../components/common/InputField";
import { fortUpdate, reflexUpdate, willUpdate } from "../store/actions/saveActions";
import { connect } from "react-redux";
import { getConstitutionBonus, getDexterityBonus, getWisdomBonus } from "../store/selectors/abilityScoreSelectors";
import { getFortSave, getReflexSave, getWillSave, getMiscFortSave, getMiscReflexSave, getMiscWillSave } from "../store/selectors/saveSelectors";

interface OwnProps {
    className?: string
}

interface StateProps {
    fortSave: number
    reflexSave: number
    willSave: number
    baseFort: number
    baseReflex: number
    baseWill: number
    conBonus: number
    dexBonus: number
    wisBonus: number
    miscFort: number
    miscReflex: number
    miscWill: number
}

interface DispatchProps {
    fortSaveChange: (fort: number) => void
    reflexSaveChange: (reflex: number) => void
    willSaveChange: (will: number) => void
 }

 type SavesContainerProps = StateProps & DispatchProps & OwnProps

 class SavesContainer extends React.Component<SavesContainerProps> {
     render() {
         return (
             <div className={this.props.className}>
                 <SectionHeader label="Saves" />
                 <div className="form-row">
                     <OutputField label="Fortitude" inputType="number" className="col" value={this.props.fortSave} />
                     <InputField label="Base" inputType="number" className="col" value={this.props.baseFort} onValueChange={this.props.fortSaveChange} />
                     <OutputField label="CON" inputType="number" className="col" value={this.props.conBonus} />
                     <OutputField label="Misc" inputType="number" className="col" value={this.props.miscFort} />
                 </div>
                 <div className="form-row">
                     <OutputField label="Reflex" inputType="number" className="col" value={this.props.reflexSave} />
                     <InputField label="Base" inputType="number" className="col" value={this.props.baseReflex} onValueChange={this.props.reflexSaveChange} />
                     <OutputField label="DEX" inputType="number" className="col" value={this.props.dexBonus} />
                     <OutputField label="Misc" inputType="number" className="col" value={this.props.miscReflex} />
                 </div>
                 <div className="form-row">
                     <OutputField label="Will" inputType="number" className="col" value={this.props.willSave} />
                     <InputField label="Base" inputType="number" className="col" value={this.props.baseWill} onValueChange={this.props.willSaveChange} />
                     <OutputField label="WIS" inputType="number" className="col" value={this.props.wisBonus} />
                     <OutputField label="Misc" inputType="number" className="col" value={this.props.miscWill} />
                 </div>
             </div>
         )
     }
 }

 function mapStateToProps(state: CharacterSheetState): StateProps {
     return {
         fortSave: getFortSave(state),
         reflexSave: getReflexSave(state),
         willSave: getWillSave(state),
         baseFort: state.saves.baseFortSave,
         baseReflex: state.saves.baseReflexSave,
         baseWill: state.saves.baseWillSave,
         conBonus: getConstitutionBonus(state),
         dexBonus: getDexterityBonus(state),
         wisBonus: getWisdomBonus(state),
         miscFort: getMiscFortSave(state),
         miscReflex: getMiscReflexSave(state),
         miscWill: getMiscWillSave(state)
     }
 }

 function mapDispatchToProps(dispatch) {
     return {
         fortSaveChange: fort => dispatch(fortUpdate(fort)),
         reflexSaveChange: reflex => dispatch(reflexUpdate(reflex)),
         willSaveChange: will => dispatch(willUpdate(will))
     }
 }

 export default connect(mapStateToProps, mapDispatchToProps)(SavesContainer)