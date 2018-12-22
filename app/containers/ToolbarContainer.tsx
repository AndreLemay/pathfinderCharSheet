import * as React from "react"
import { connect } from "react-redux"
import Toolbar from "../components/Toolbar";
import EquipmentModal from "../components/EquipmentModal";
import { saveCharacter, loadCharacter, addAttack, addFeat, addEquip } from "../store/actions/toolbarActions";
import { EquipmentState, ValueBonus } from "../store/types";

interface DispatchProps {
    save: () => void
    load: () => void
    addFeat: () => void
    addEquip: (equip: EquipmentState) => void
    addAttack: () => void
}

type ToolbarContainerProps = DispatchProps

class ToolbarContainer extends React.Component<ToolbarContainerProps> {
    private equipModalRef: React.RefObject<EquipmentModal>
    constructor(props: ToolbarContainerProps) {
        super(props)

        this.equipModalRef = React.createRef()
    }
    private onSaveClicked = () => {

    }

    private onLoadClicked = () => {

    }

    private onAddFeatClicked = () => {

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
            </div>
        )
    }
}

function mapDispatchToProps(dispatch): DispatchProps {
    return {
        save: () => dispatch(saveCharacter()),
        load: () => dispatch(loadCharacter()),
        addAttack: () => dispatch(addAttack()),
        addFeat: () => dispatch(addFeat()),
        addEquip: equip => dispatch(addEquip(equip))
    }
}

export default connect(null, mapDispatchToProps)(ToolbarContainer)