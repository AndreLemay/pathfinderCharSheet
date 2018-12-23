import * as React from "react"
import { connect } from "react-redux"
import Toolbar from "../components/Toolbar";
import EquipmentModal from "../components/EquipmentModal";
import { saveCharacter, loadCharacter, addAttack, addFeat, addEquip } from "../store/actions/toolbarActions";
import { EquipmentState, ValueBonus, FeatState } from "../store/types";
import FeatModal from "../components/FeatModal";

interface DispatchProps {
    save: () => void
    load: () => void
    addFeat: (feat: FeatState) => void
    addEquip: (equip: EquipmentState) => void
    addAttack: () => void
}

type ToolbarContainerProps = DispatchProps

class ToolbarContainer extends React.Component<ToolbarContainerProps> {
    private equipModalRef: React.RefObject<EquipmentModal>
    private featModalRef: React.RefObject<FeatModal>
    constructor(props: ToolbarContainerProps) {
        super(props)

        this.equipModalRef = React.createRef()
        this.featModalRef = React.createRef()
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
        this.props.addEquip(feat)
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
            </div>
        )
    }
}

function mapDispatchToProps(dispatch): DispatchProps {
    return {
        save: () => dispatch(saveCharacter()),
        load: () => dispatch(loadCharacter()),
        addAttack: () => dispatch(addAttack()),
        addFeat: feat => dispatch(addFeat(feat)),
        addEquip: equip => dispatch(addEquip(equip))
    }
}

export default connect(null, mapDispatchToProps)(ToolbarContainer)