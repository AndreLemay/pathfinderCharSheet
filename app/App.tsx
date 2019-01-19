import * as React from "react"
import configureStore from "./store/configureStore";
import { Provider } from "react-redux"
import AbilityScoresContainer from "./containers/AbilityScoresContainer";
import CharacterContainer from "./containers/CharacterContainer"
import HealthContainer from "./containers/HealthContainer";
import AttackBonusContainer from "./containers/AttackBonusContainer";
import SavesContainer from "./containers/SavesContainer";
import FeatsContainer from "./containers/FeatsContainer";
import SkillsContainer from "./containers/SkillsContainer";
import ArmourClassContainer from "./containers/ArmourClassContainer";
import CombatManeuversContainer from "./containers/CombatManeuversContainer";
import AttacksContainer from "./containers/AttacksContainer";
import ArmourContainer from "./containers/ArmourContainer";
import ShieldContainer from "./containers/ShieldContainer";
import EquipmentContainer from "./containers/EquipmentContainer";
import InitiativeContainer from "./containers/InitiativeContainer";
import ToolbarContainer from "./containers/ToolbarContainer";
import EquipmentModal from "./components/EquipmentModal";
import FeatModal from "./components/FeatModal";
import AttackModal, { AttackInfoBundle } from "./components/AttackModal";
import { FeatState, EquipmentState, AttackState } from "./store/types";

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

    public openFeatModal = (onSave: (state: FeatState) => void, feat?: FeatState) => {
        this.featModalRef.current.open(feat).then(onSave)
    }

    public openEquipModal = (onSave: (state: EquipmentState) => void, equip?: EquipmentState) => {
        this.equipModalRef.current.open(equip).then(onSave)
    }

    public openAttackModal = (onSave: (state: AttackInfoBundle) => void, attack?: AttackState) => {
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
                                <div className="row">
                                    <AbilityScoresContainer className="col" />
                                </div>
                                <InitiativeContainer className="form-row align-items-end" />
                            </div>

                            <div className="col-6 px-5">
                                <CharacterContainer className="form-row align-items-end" />
                                <HealthContainer className="form-row align-items-end" />
                                <div className="row">
                                    <AttackBonusContainer className="col-4 pl-0" />
                                    <SavesContainer className="col-8 pr-0" />
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <FeatsContainer className="col-4 pl-5" openFeatModal={this.openFeatModal} />
                            <SkillsContainer className="col-8 px-5" />
                        </div>
                        <div className="row mt-4">
                            <div className="col-6 px-5">
                                <div className="row">
                                    <ArmourClassContainer className="col" />
                                </div>
                                <div className="row">
                                    <CombatManeuversContainer className="col" />
                                </div>
                            </div>
                            <AttacksContainer className="col-6 px-5" />
                        </div>
                        <div className="row mt-4">
                            <div className="col-6 px-5">
                                <div className="row">
                                    <ArmourContainer className="col" />
                                </div>
                                <div className="row">
                                    <ShieldContainer className="col" />
                                </div>
                            </div>
                            <EquipmentContainer className="col-6 px-5" />
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