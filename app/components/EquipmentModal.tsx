import * as React from "react"
import * as $ from "jquery"
import { BonusType, StatType, BonusTypeValue, StatTypeValue, SkillNameValue, SkillName } from "../api/enums";
import InputField from "./common/InputField";
import DropdownField from "./common/DropdownField";
import { ValueBonus } from "../store/types";
import OutputField from "./common/OutputField";

interface ModalProps {
    addEquipment: (name: string, desc: string, bonuses: ValueBonus[]) => void
}

interface ModalState {
    modal: boolean
    name: string
    description: string
    bonuses: ValueBonus[]
    curStatBonusType: BonusTypeValue
    curStatAffected: StatTypeValue
    curStatBonusAmt: number
    curSkillBonusType: BonusTypeValue
    curSkillAffected: SkillNameValue
    curSkillBonusAmt: number
}

const defaultState: ModalState = {
    modal: false,
    name: "",
    description: "",
    bonuses: [],
    curStatBonusType: BonusType.Alchemical,
    curStatAffected: StatType.AllSaves,
    curStatBonusAmt: 0,
    curSkillBonusType: BonusType.Alchemical,
    curSkillAffected: SkillName.Acrobatics,
    curSkillBonusAmt: 0
}

export default class EquipmentModal extends React.Component<ModalProps, ModalState> {
    private modalRef: React.RefObject<HTMLDivElement>
    state = defaultState
    constructor(props) {
        super(props);
        this.modalRef = React.createRef()
    }

    componentDidMount = () => {
        $(this.modalRef.current).modal({ show: false })
    }

    toggle = () => {
        this.setState(defaultState)
        $(this.modalRef.current).modal("toggle")
    }

    private addStatBonus = () => {
        let bonus = new ValueBonus(this.state.curStatAffected, this.state.curStatBonusType, this.state.curStatBonusAmt)
        this.setState((prevState) => {
            return { bonuses: [...prevState.bonuses, bonus] }
        })
    }

    private addSkillBonus = () => {
        let bonus = new ValueBonus(this.state.curSkillAffected, this.state.curSkillBonusType, this.state.curSkillBonusAmt)
        this.setState((prevState) => {
            return { bonuses: [...prevState.bonuses, bonus]}
        })
    }

    private addEquip = () => {
        this.props.addEquipment(this.state.name, this.state.description, this.state.bonuses)
        this.toggle()
    }

    render() {
        return (
            <div className="modal fade" id="addEquipmentModal" ref={this.modalRef} tabIndex={-1} role="dialog" aria-labelledby="addEquipmentModalTitle"
                aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addEquipmentModalTitle">New Equipment</h5>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <div className="form-row align-items-end">
                                    <InputField className="col-3"
                                        label="Name"
                                        value={this.state.name}
                                        onValueChange={(newName) => {
                                            this.setState({ name: newName + "" }) //need to force-coerce it to a string to keep tsc happy
                                        }} />
                                    <OutputField className="col-9"
                                        label="Properties"
                                        value={this.state.bonuses.map((bonus) => bonus.asString(true)).join(" ")} />
                                    <InputField className="col"
                                        inputType="textarea"
                                        value={this.state.description}
                                        onValueChange={(newDesc) => {
                                            this.setState({ description: newDesc + "" })
                                        }} />
                                </div>
                                <div className="form-row align-items-end">
                                    <label>Stat Bonus</label>
                                    <DropdownField className="col"
                                        label="Bonus Type"
                                        dropdownType={BonusType}
                                        value={this.state.curStatBonusType}
                                        onValueChange={(newType: BonusTypeValue) => {
                                            this.setState({ curStatBonusType: newType })
                                        }} />
                                    <DropdownField className="col"
                                        label="Affected Stat"
                                        dropdownType={StatType}
                                        value={this.state.curStatAffected}
                                        onValueChange={(newStat: StatTypeValue) => {
                                            this.setState({ curStatAffected: newStat })
                                        }} />
                                    <InputField className="col"
                                        label="Amount"
                                        inputType="number"
                                        value={this.state.curStatBonusAmt}
                                        onValueChange={(amt) => {
                                            this.setState({ curStatBonusAmt: amt !== null ? +amt : null })
                                        }} />
                                    <div className="form-group">
                                        <button className="btn btn-secondary" onClick={this.addStatBonus}>Add</button>
                                    </div>
                                </div>
                                <div className="form-row align-items-end">
                                    <label>Skill Bonus</label>
                                    <DropdownField className="col"
                                        label="Bonus Type"
                                        dropdownType={BonusType}
                                        value={this.state.curSkillBonusType}
                                        onValueChange={(newType: BonusTypeValue) => {
                                            this.setState({ curSkillBonusType: newType })
                                        }} />
                                    <DropdownField className="col"
                                        label="Affected Skill" dropdownType={SkillName}
                                        value={this.state.curSkillAffected}
                                        onValueChange={(skill: SkillNameValue) => {
                                            this.setState({ curSkillAffected: skill })
                                        }} />
                                    <InputField className="col"
                                        label="Amount"
                                        inputType="number"
                                        value={this.state.curSkillBonusAmt}
                                        onValueChange={(amt) => {
                                            this.setState({ curSkillBonusAmt: amt !== null ? +amt : null })
                                        }} />
                                    <div className="form-group">
                                        <button className="btn btn-secondary" onClick={this.addSkillBonus}>Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.toggle}>Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={this.addEquip}>Add Equipment</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}