// import * as React from "react"
// import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Container, div, div } from "reactstrap"
// import { BonusType, StatType } from "../api/enums";
// import InputField from "./common/InputField";
// import DropdownField from "./common/DropdownField";

// interface ModalProps {
//     okCallback?: () => void
// }

// export default class EquipmentModal extends React.Component<ModalProps, any> {
//     constructor(props) {
//         super(props);
//         this.state = {
//             modal: false
//         };
//     }

//     toggle() {
//         this.setState((prevState) => {
//             return { modal: !prevState.modal }
//         });
//     }

//     addStatBonus() {

//     }

//     addSkillBonus() {

//     }

//     render() {
//         return (
//             <Modal tabIndex={-1} isOpen={this.state.modal} toggle={this.toggle}>
//                 <ModalHeader toggle={this.toggle}>New Equipment</ModalHeader>
//                 <ModalBody>
//                     <Container>
//                         <div class="align-items-end">
//                             <InputField label="Name" className="col-3"></InputField>
//                             <InputField label="Properties" className="col-9"></InputField>
//                             <div>
//                                 <InputField inputType="textarea"></InputField>
//                             </div>
//                         </div>
//                         <div class="align-items-end">
//                             <label>Stat Bonus</label>
//                             <DropdownField label="Bonus Type" dropdownType={BonusType} />
//                             <DropdownField label="Affected Stat" dropdownType={StatType} />
//                             <InputField label="Amount" inputType="number"></InputField>
//                             <div className="form-group">
//                                 <Button color="secondary" onClick={this.addStatBonus}>Add</Button>
//                             </div>
//                         </div>
//                         <div class="align-items-end">
//                             <label>Skill Bonus</label>
//                             <DropdownField label="Bonus Type" dropdownType={BonusType} />
//                             <DropdownField label="Affected Stat" dropdownType={StatType} />
//                             <InputField label="Amount" inputType="number"></InputField>
//                             <div className="form-group">
//                                 <Button color="secondary" onClick={this.addSkillBonus}>Add</Button>
//                             </div>
//                         </div>
//                     </Container>
//                 </ModalBody>
//                 <ModalFooter>
//                     <Button color="secondary" onClick={this.toggle}>Cancel</Button>
//                     <Button color="primary" onClick={this.props.okCallback}>Add Equipment</Button>
//                 </ModalFooter>
//             </Modal>

//         )
//     }
// }