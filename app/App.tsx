import * as React from "react"
import { Container, Row, Col, FormGroup } from "reactstrap";
import Toolbar from "./components/Toolbar";
import { SectionHeader, InputField, DropdownField } from "./components/common";
import AbilityScore from "./components/AbilityScore";
import Skill from "./components/Skill"
import { Alignment, Gender, Size, SkillName, ArmourType } from "./api/enums";

export default class App extends React.Component<any, any> {
    render() {
        return (
            <div>
                <Toolbar
                    save={this.toolbarSave}
                    load={this.toolbarLoad}
                    addEquip={this.addEquipment}
                    addFeat={this.addFeat}
                    addAttack={this.addAttack} />
                <Container fluid className="mt-4">
                    <Row>
                        <Col xs="6" className="px-5">
                            <SectionHeader label="Ability Scores" />
                            <AbilityScore label="STR" />
                            <AbilityScore label="DEX" />
                            <AbilityScore label="CON" />
                            <AbilityScore label="INT" />
                            <AbilityScore label="WIS" />
                            <AbilityScore label="CHA" />
                        </Col>
                        <Col xs="6" className="px-5">
                            <SectionHeader label="Character" />
                            <Row className="form-row align-items-end">
                                <InputField label="Name" className="col" />
                                <DropdownField label="Alignment" className="col" dropdownType={Alignment} />
                                <DropdownField label="Gender" className="col" dropdownType={Gender} />
                            </Row>
                            <Row className="form-row align-items-end">
                                <InputField label="Race" className="col" />
                                <DropdownField label="Size" className="col" dropdownType={Size} />
                            </Row>
                            <SectionHeader label="Health" />
                            <Row className="form-row">
                                <InputField label="Current" inputType="number" className="col" />
                                <InputField label="Max" inputType="number" className="col" />
                                <InputField label="Temp" inputType="number" className="col" />
                                <InputField label="Non-Lethal" inputType="number" className="col" />
                            </Row>
                            <Row className="form-row">
                                <InputField label="Current" inputType="textarea" className="col" />
                                <InputField label="Current" inputType="textarea" className="col" />
                            </Row>
                            <Row>
                                <Col xs="4">
                                    <SectionHeader label="Attack Bonus" />
                                    <Row className="form-row">
                                        <InputField label="Base" inputType="number" className="col" />
                                        <InputField label="Misc" inputType="number" className="col" readonly={true} />
                                    </Row>
                                    <Row className="form-row">
                                        <InputField label="Melee" inputType="number" className="col" readonly={true} />
                                        <InputField label="Ranged" inputType="number" className="col" readonly={true} />
                                    </Row>
                                </Col>
                                <Col xs="8">
                                    <SectionHeader label="Saves" />
                                    <Row className="form-row">
                                        <InputField label="Fortitude" inputType="number" className="col" readonly={true} />
                                        <InputField label="Base" inputType="number" className="col" />
                                        <InputField label="CON" inputType="number" className="col" readonly={true} />
                                        <InputField label="Misc" inputType="number" className="col" readonly={true} />
                                    </Row>
                                    <Row className="form-row">
                                        <InputField label="Reflex" inputType="number" className="col" readonly={true} />
                                        <InputField label="Base" inputType="number" className="col" />
                                        <InputField label="DEX" inputType="number" className="col" readonly={true} />
                                        <InputField label="Misc" inputType="number" className="col" readonly={true} />
                                    </Row>
                                    <Row className="form-row">
                                        <InputField label="Will" inputType="number" className="col" readonly={true} />
                                        <InputField label="Base" inputType="number" className="col" />
                                        <InputField label="WIS" inputType="number" className="col" readonly={true} />
                                        <InputField label="Misc" inputType="number" className="col" readonly={true} />
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col xs="4" className="px-5">
                            <SectionHeader label="Feats/Abilities" />
                            {//render all feats here
                            }
                        </Col>
                        <Col xs="8" className="skill-table px-5">
                            <SectionHeader label="Skills" />
                            <Row className="form-row align-items-end skill-table-head">
                                <Col xs="4"></Col>
                                <Col><label>Trained Only</label></Col>
                                <Col><label>Skill Bonus</label></Col>
                                <Col><label>Ability Bonus</label></Col>
                                <Col><label>Class Skill</label></Col>
                                <Col><label>Ranks</label></Col>
                                <Col><label>Feats / Abilities</label></Col>
                                <Col><label>Misc</label></Col>
                                <Col><label>Armour Check Penalty</label></Col>
                            </Row>
                            <div className="skill-table-body">
                                {SkillName.values.map((skill) => {
                                    return (
                                        <Skill key={skill.ordinal}
                                            label={skill.description}
                                            trainedOnly={skill.trainedOnly}
                                            checkPenaltyApplies={skill.checkPenaltyApplies} />
                                    )
                                })}
                            </div>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col xs="6" className="px-5">
                            <SectionHeader label="Armour Class" />
                            <Row className="form-row align-items-end">
                                <InputField label="Armour Class"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                                <InputField label="Base"
                                    className="col"
                                    inputType="number"
                                    readonly={true}
                                    defaultValue="10" />
                                <InputField label="DEX"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                                <InputField label="Dodge"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                                <InputField label="Deflection"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                                <InputField label="Armour"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                                <InputField label="Shield"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                                <InputField label="Natural"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                                <InputField label="Size"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                            </Row>
                            <Row className="form-row align-items-end">
                                <InputField label="Flat-Footed"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                                <InputField label="Base"
                                    className="col"
                                    inputType="number"
                                    readonly={true}
                                    defaultValue="10" />
                                <Col />
                                <Col />
                                <InputField label="Deflection"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                                <InputField label="Armour"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                                <InputField label="Shield"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                                <InputField label="Natural"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                                <InputField label="Size"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                            </Row>
                            <Row className="form-row align-items-end">
                                <InputField label="Touch"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                                <InputField label="Base"
                                    className="col"
                                    inputType="number"
                                    readonly={true}
                                    defaultValue="10" />
                                <InputField label="DEX"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                                <InputField label="Dodge"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                                <InputField label="Deflection"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                                <Col />
                                <Col />
                                <Col />
                                <InputField label="Size"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                            </Row>
                            <Row className="form-row align-items-end">
                                <InputField label="Spell Res."
                                    className="col-2"
                                    inputType="number" />
                            </Row>
                            <SectionHeader label="Combat Manoeuvres" />
                            <Row className="form-row align-items-end">
                                <InputField label="CMB"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                                <InputField label="STR"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                                <InputField label="BAB"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                                <InputField label="Size"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                                <InputField label="Misc"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                                <Col />
                                <Col />
                                <Col />
                                <Col />
                            </Row>
                            <Row className="form-row align-items-end">
                                <InputField label="CMD"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                                <InputField label="Base"
                                    className="col"
                                    inputType="number"
                                    readonly={true}
                                    defaultValue="10" />
                                <InputField label="STR"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                                <InputField label="DEX"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                                <InputField label="Dodge"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                                <InputField label="Deflection"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                                <InputField label="BAB"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                                <InputField label="Size"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                                <InputField label="Misc"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                            </Row>
                            <Row className="form-row align-items-end">
                                <InputField label="Flat-Footed"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                                <InputField label="Base"
                                    className="col"
                                    inputType="number"
                                    readonly={true}
                                    defaultValue="10" />
                                <InputField label="STR"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                                <Col />
                                <Col />
                                <InputField label="Deflection"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                                <InputField label="BAB"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                                <InputField label="Size"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                                <InputField label="Misc"
                                    className="col"
                                    inputType="number"
                                    readonly={true} />
                            </Row>
                        </Col>
                        <Col xs="6">
                            <SectionHeader label="Attacks" />
                            {
                                //render attacks here
                            }
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col xs="6" className="px-5">
                            <SectionHeader label="Armour" />
                            <Row className="form-row align-items-end">
                                <InputField label="Name"
                                    className="col-12" />
                                <FormGroup className="col">
                                    <InputField inputType="textarea" />
                                </FormGroup>
                            </Row>
                            <Row className="form-row align-items-end">
                                <DropdownField label="Type"
                                    className="col"
                                    dropdownType={ArmourType} />
                                <InputField label="Max Speed"
                                    className="col"
                                    inputType="number" />
                                <InputField label="Max DEX"
                                    className="col"
                                    inputType="number" />
                            </Row>
                            <Row className="form-row align-items-end">
                                <InputField label="Check Penalty"
                                    className="col"
                                    inputType="number" />
                                <InputField label="AC Bonus"
                                    className="col"
                                    inputType="number" />
                            </Row>
                            <SectionHeader label="Shield" />
                            <Row className="form-row align-items-end">
                                <InputField label="Name"
                                    className="col-12" />
                                <FormGroup className="col">
                                    <InputField inputType="textarea" />
                                </FormGroup>
                            </Row>
                            <Row className="form-row align-items-end">
                                <InputField label="Check Penalty"
                                    className="col"
                                    inputType="number" />
                                <InputField label="AC Bonus"
                                    className="col"
                                    inputType="number" />
                            </Row>
                        </Col>
                        <Col xs="6" className="px-5">
                            <SectionHeader label="Equipment" />
                            {
                                //render equipment here
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
    toolbarSave() {

    }
    toolbarLoad() {

    }
    addEquipment() {

    }
    addFeat() {

    }
    addAttack() {

    }
}