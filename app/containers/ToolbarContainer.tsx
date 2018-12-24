import * as React from "react"
import { connect } from "react-redux"
import Toolbar from "../components/Toolbar";
import EquipmentModal from "../components/EquipmentModal";
import { saveCharacter, loadCharacter, addAttack, addFeat, addEquip } from "../store/actions/toolbarActions";
import { EquipmentState, ValueBonus, FeatState, AttackState } from "../store/types";
import FeatModal from "../components/FeatModal";
import AttackModal, { AttackInfoBundle } from "../components/AttackModal";

interface DispatchProps {
    save: () => void
    load: () => void
    addFeat: (feat: FeatState) => void
    addEquip: (equip: EquipmentState) => void
    addAttack: (attack: AttackState, equip: EquipmentState) => void
}

type ToolbarContainerProps = DispatchProps

class ToolbarContainer extends React.Component<ToolbarContainerProps> {
    private equipModalRef: React.RefObject<EquipmentModal>
    private featModalRef: React.RefObject<FeatModal>
    private attackModalRef: React.RefObject<AttackModal>
    constructor(props: ToolbarContainerProps) {
        super(props)

        this.equipModalRef = React.createRef()
        this.featModalRef = React.createRef()
        this.attackModalRef = React.createRef()
    }
    private onSaveClicked = () => {

    }

    private onLoadClicked = () => {

    }

    private onAddFeatClicked = () => {
        this.featModalRef.current.toggle()
    }

    private onAddEquipClicked = () => {
        this.equipModalRef.current.toggle()
    }

    private onAddAttackClicked = () => {
        this.attackModalRef.current.toggle()
    }

    private addEquipment = (name: string, desc: string, bonuses: ValueBonus[]) => {
        let equip: EquipmentState = {
            name: name,
            description: desc,
            bonuses: bonuses
        }
        this.props.addEquip(equip)
    }

    private addFeat = (name: string, desc: string, bonuses: ValueBonus[]) => {
        let feat: FeatState = {
            name: name,
            description: desc,
            bonuses: bonuses,
            active: true
        }
        this.props.addFeat(feat)
    }

    private addAttack = (bundle: AttackInfoBundle) => {
        let { name, description, bonuses, range, type, dmgDieCount, dmgDie, critRange, critMultiplier } = bundle
        let attack: AttackState = {
            name,
            description,
            range,
            type,
            dmgDieCount,
            dmgDie,
            critRange,
            critMultiplier
        }
        let equip: EquipmentState = {
            name,
            description,
            bonuses
        }
        this.props.addAttack(attack, equip)
    }

    render() {
        return (
            <div>
                <Toolbar
                    save={this.onSaveClicked}
                    load={this.onLoadClicked}
                    addAttack={this.onAddAttackClicked}
                    addEquip={this.onAddEquipClicked}
                    addFeat={this.onAddFeatClicked} />
                <EquipmentModal ref={this.equipModalRef} addEquipment={this.addEquipment} />
                <FeatModal ref={this.featModalRef} addFeat={this.addFeat} />
                <AttackModal ref={this.attackModalRef} addAttack={this.addAttack} />
            </div>
        )
    }
}

function mapDispatchToProps(dispatch): DispatchProps {
    return {
        save: () => dispatch(saveCharacter()),
        load: () => dispatch(loadCharacter()),
        addAttack: (attack, equip) => dispatch(addAttack(attack, equip)),
        addFeat: feat => dispatch(addFeat(feat)),
        addEquip: equip => dispatch(addEquip(equip))
    }
}

export default connect(null, mapDispatchToProps)(ToolbarContainer)