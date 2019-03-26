import * as React from "react"
import configureStore from "../shared/store/configureStore";
import { Provider } from "react-redux"
import CharacterContainer from "../shared/containers/CharacterContainer"
import HealthContainer from "../shared/containers/HealthContainer";
import AttackBonusContainer from "../shared/containers/AttackBonusContainer";
import SavesContainer from "../shared/containers/SavesContainer";
import FeatsContainer from "../shared/containers/FeatsContainer";
import SkillsContainer from "../shared/containers/SkillsContainer";
import ArmourClassContainer from "../shared/containers/ArmourClassContainer";
import CombatManeuversContainer from "../shared/containers/CombatManeuversContainer";
import AttacksContainer from "../shared/containers/AttacksContainer";
import ArmourContainer from "../shared/containers/ArmourContainer";
import ShieldContainer from "../shared/containers/ShieldContainer";
import EquipmentContainer from "../shared/containers/EquipmentContainer";
import InitiativeContainer from "../shared/containers/InitiativeContainer";
import ToolbarContainer from "../shared/containers/ToolbarContainer";
import EquipmentModal from "./components/EquipmentModal";
import FeatModal from "./components/FeatModal";
import AttackModal from "./components/AttackModal";
import AbilityScoresSection from "./components/AbilityScoresSection";
import CharacterSection from "./components/CharacterSection";
import HealthSection from "./components/HealthSection";
import AttackBonusSection from "./components/AttackBonusSection";
import InitiativeSection from "./components/InitiativeSection";
import SaveSection from "./components/SaveSection";
import ArmourClassSection from "./components/ArmourClassSection";
import CombatManeuverSection from "./components/CombatManeuverSection";
import ArmourSection from "./components/ArmourSection";
import ShieldSection from "./components/ShieldSection";
import SkillsSection from "./components/SkillsSection";
import EquipmentSection from "./components/EquipmentSection";
import { FeatInfoBundle, AttackInfoBundle } from "../shared/api/componentPropTypes";
import FeatsSection from "./components/FeatsSection";
import AttacksSection from "./components/AttacksSection";

const store = configureStore()

export default class App extends React.Component {
    private equipModalRef: React.RefObject<EquipmentModal>
    private featModalRef: React.RefObject<FeatModal>
    private attackModalRef: React.RefObject<AttackModal>
    constructor(props: any) {
        super(props)

        this.equipModalRef = React.createRef()
        this.featModalRef = React.createRef()
        this.attackModalRef = React.createRef()
    }

    public openFeatModal = (onSave: (state: FeatInfoBundle) => void, feat?: FeatInfoBundle) => {
        this.featModalRef.current.open(feat).then(onSave)
    }

    public openEquipModal = (onSave: (state: FeatInfoBundle) => void, equip?: FeatInfoBundle) => {
        this.equipModalRef.current.open(equip).then(onSave)
    }

    public openAttackModal = (onSave: (state: AttackInfoBundle) => void, attack?: AttackInfoBundle) => {
        this.attackModalRef.current.open(attack).then(onSave)
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <ToolbarContainer
                        openFeatModal={this.openFeatModal}
                        openEquipModal={this.openEquipModal}
                        openAttackModal={this.openAttackModal} />
                    <div className="container-fluid">
                        <div className="row mt-4">
                        <div className="col-6 px-5">
                                <AbilityScoresSection className="form-row align-items-end" />
                                <InitiativeContainer className="form-row align-items-end" initiativeComponent={InitiativeSection} />
                        </div>
                            <div className="col-6 px-5">
                                <CharacterContainer className="form-row align-items-end" characterSectionComponent={CharacterSection} />
                                <HealthContainer className="form-row align-items-end" healthSectionComponent={HealthSection} />
                                <div className="row">
                                    <AttackBonusContainer className="col-4 pl-0" attackBonusComponent={AttackBonusSection} />
                                    <SavesContainer className="col-8 pr-0" saveComponent={SaveSection} />
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <FeatsContainer className="col-4 pl-5" openFeatModal={this.openFeatModal} featsSectionComponent={FeatsSection} />
                            <SkillsContainer className="col-8 px-5" skillsSectionComponent={SkillsSection} />
                        </div>
                        <div className="row mt-4">
                            <div className="col-6 px-5">
                                <div className="row">
                                    <ArmourClassContainer className="col" armourClassComponent={ArmourClassSection} />
                                </div>
                                <div className="row">
                                    <CombatManeuversContainer className="col" combatManeuverComponent={CombatManeuverSection} />
                                </div>
                            </div>
                            <AttacksContainer className="col-6 px-5" openAttackModal={this.openAttackModal} attacksSectionComponent={AttacksSection} />
                        </div>
                        <div className="row mt-4">
                            <div className="col-6 px-5">
                                <div className="row">
                                    <ArmourContainer className="col" armourComponent={ArmourSection} />
                                </div>
                                <div className="row">
                                    <ShieldContainer className="col" shieldComponent={ShieldSection} />
                                </div>
                            </div>
                            <EquipmentContainer className="col-6 px-5" openEquipModal={this.openEquipModal} equipmentSectionComponent={EquipmentSection} />
                        </div>
                    </div>
                </div>
                <EquipmentModal ref={this.equipModalRef} />
                <FeatModal ref={this.featModalRef} />
                <AttackModal ref={this.attackModalRef} />
            </Provider>
        )
    }
}