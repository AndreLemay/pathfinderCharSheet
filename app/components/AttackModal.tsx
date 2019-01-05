import * as React from "react"
import * as $ from "jquery"
import { BonusType, StatType, BonusTypeValue, StatTypeValue, SkillNameValue, SkillName, DamageDieValue, DamageDie } from "../api/enums";
import InputField from "./common/InputField";
import DropdownField from "./common/DropdownField";
import { ValueBonus } from "../store/types";
import OutputField from "./common/OutputField";

export interface AttackInfoBundle {
    name: string
    description: string
    bonuses: ValueBonus[]
    range: number
    type: string
    critRange: number
    critMultiplier: number
    dmgDieCount: number
    dmgDie: DamageDieValue
}

interface ModalProps {
    addAttack: (bundle: AttackInfoBundle) => void
}

interface ModalState {
    modal: boolean
    name: string
    description: string
    range: number
    type: string
    critRange: number
    critMultiplier: number
    dmgDieCount: number
    dmgDie: DamageDieValue
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
    range: 0,
    type: "",
    bonuses: [],
    dmgDieCount: 1,
    dmgDie: DamageDie[2],
    critRange: 20,
    critMultiplier: 2,
    curStatBonusType: BonusType.Alchemical,
    curStatAffected: StatType.AllSaves,
    curStatBonusAmt: 0,
    curSkillBonusType: BonusType.Alchemical,
    curSkillAffected: SkillName.Acrobatics,
    curSkillBonusAmt: 0
}

export default class AttackModal extends React.Component<ModalProps, ModalState> {
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
            return { bonuses: [...prevState.bonuses, bonus] }
        })
    }

    private addAttack = () => {
        this.props.addAttack({
            name: this.state.name,
            description: this.state.description,
            bonuses: this.state.bonuses,
            range: this.state.range,
            type: this.state.type,
            dmgDieCount: this.state.dmgDieCount,
            dmgDie: this.state.dmgDie,
            critRange: this.state.critRange,
            critMultiplier: this.state.critMultiplier
        })
        this.toggle()
    }

    render() {
        return (
            <div className="modal fade" id="addAttackModal" ref={this.modalRef} tabIndex={-1} role="dialog" aria-labelledby="addAttackModalTitle"
                aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addAttackModalTitle">New Attack</h5>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <div className="form-row align-items-end">
                                    <InputField label="Name" className="col-3"
                                        value={this.state.name}
                                        onValueChange={name => this.setState({ name: name + "" })} />
                                    <OutputField label="Properties" className="col-9"
                                        value={this.state.bonuses.map((bonus => bonus.asString(true))).join(" ")} />
                                    <InputField inputType="textarea" className="col"
                                        value={this.state.description}
                                        onValueChange={desc => this.setState({ description: desc + "" })} />
                                </div>
                                <div className="form-row align-items-end">
                                    <InputField label="Range" inputType="number" className="col-1"
                                        value={this.state.range} step={5}
                                        onValueChange={range => this.setState({ range: range !== null ? +range : null })} />
                                    <div className="form-group col-5">
                                        <label>Type</label>
                                        <div className="form-control form-control-sm">
                                            <div className="form-check form-check-inline">
                                                <input type="checkbox" className="form-check-input"
                                                    checked={this.state.type.indexOf("B") >= 0}
                                                    onChange={event => {
                                                        let checked = event.currentTarget.checked
                                                        this.setState(prevState => {
                                                            return checked ?
                                                                { type: "B" + prevState.type } :
                                                                { type: prevState.type.slice(1) }
                                                        })
                                                    }} />
                                                <label className="form-check-label">Bludegeoning</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                    <input type="checkbox" className="form-check-input"
                                                        checked={this.state.type.indexOf("P") >= 0}
                                                        onChange={event => {
                                                            let checked = event.currentTarget.checked
                                                            this.setState(prevState => {
                                                                //this is ugly as fuck but the best I can do on a plane with no access to download
                                                                //better string/array manipulation
                                                                let brokenStr = [...prevState.type]
                                                                let newStr = ""
                                                                if (brokenStr[0] === "B") {
                                                                    newStr = checked ? "BP" + (brokenStr[1] || "")
                                                                        : "B" + (brokenStr[2] || "")
                                                                }
                                                                else {
                                                                    newStr = checked ? "P" + (brokenStr[0] || "")
                                                                        : brokenStr.join("")
                                                                }
                                                                return { type: newStr }
                                                            })
                                                    }} />
                                                <label className="form-check-label">Piercing</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                    <input type="checkbox" className="form-check-input"
                                                        checked={this.state.type.indexOf("S") >= 0}
                                                        onChange={event => {
                                                            let checked = event.currentTarget.checked
                                                            this.setState(prevState => {
                                                                return checked ?
                                                                    { type: prevState.type + "S" } :
                                                                    { type: prevState.type.slice(0, prevState.type.length - 1) }
                                                            })
                                                    }} />
                                                <label className="form-check-label">Slashing</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group col-3">
                                        <label>Damage</label>
                                        <div className="input-group input-group-sm">
                                            <input type="number" className="form-control form-control-sm"
                                                value={this.state.dmgDieCount}
                                                onChange={event => {
                                                    this.setState({ dmgDieCount: event.currentTarget.valueAsNumber })
                                                }} />
                                            <div className="input-group-prepend input-group-append">
                                                <div className="input-group-text">d</div>
                                            </div>
                                            <select className="form-control form-control-sm"
                                                value={this.state.dmgDie.propName}
                                                onChange={event => {
                                                    this.setState({ dmgDie: DamageDie.byPropName(event.currentTarget.value) })
                                                }}>
                                                <option value={DamageDie[2].propName}>{DamageDie[2].description}</option>
                                                <option value={DamageDie[3].propName}>{DamageDie[3].description}</option>
                                                <option value={DamageDie[4].propName}>{DamageDie[4].description}</option>
                                                <option value={DamageDie[6].propName}>{DamageDie[6].description}</option>
                                                <option value={DamageDie[8].propName}>{DamageDie[8].description}</option>
                                                <option value={DamageDie[10].propName}>{DamageDie[10].description}</option>
                                                <option value={DamageDie[12].propName}>{DamageDie[12].description}</option>
                                                <option value={DamageDie[20].propName}>{DamageDie[20].description}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group col-3">
                                        <label>Critical</label>
                                        <div className="input-group input-group-sm">
                                            <input type="number" min="1" max="20" className="form-control form-control-sm"
                                                value={this.state.critRange}
                                                onChange={event => {
                                                    this.setState({ critRange: event.currentTarget.valueAsNumber })
                                                }} />
                                            <div className="input-group-prepend input-group-append">
                                                <div className="input-group-text">-20 x</div>
                                            </div>
                                            <input type="number" className="form-control form-control-sm"
                                                value={this.state.critMultiplier}
                                                onChange={event => {
                                                    this.setState({ critMultiplier: event.currentTarget.valueAsNumber })
                                                }} />
                                        </div>
                                    </div>
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
                            <button type="button" className="btn btn-primary" onClick={this.addAttack}>Add Attack</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}