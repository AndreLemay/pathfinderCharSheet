import * as React from "react"
import { connect } from "react-redux"
import Toolbar from "../components/Toolbar";
import EquipmentModal from "../components/EquipmentModal";
import { loadCharacter, addAttack, addFeat, addEquip } from "../store/actions/toolbarActions";
import CharacterSheetState, { EquipmentState, ValueBonus, FeatState, AttackState } from "../store/types";
import FeatModal from "../components/FeatModal";
import AttackModal, { AttackInfoBundle } from "../components/AttackModal";
import { remote } from "electron";
import * as path from "path"
import * as jetpack from "fs-jetpack"
import { EnumValue } from "ts-enums";
import { StatTypeValue } from "../api/enums";

interface StateProps {
    state: CharacterSheetState
}

interface DispatchProps {
    load: (path: string) => void
    addFeat: (feat: FeatState) => void
    addEquip: (equip: EquipmentState) => void
    addAttack: (attack: AttackState, equip: EquipmentState) => void
}

type ToolbarContainerProps = StateProps & DispatchProps

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

    private stateAsSav = (): any => {
        let copyProps = (obj: any): any => {
            let newObj = {}
            for (var key in obj) {
                switch (typeof obj[key]) {
                    default:                        
                        newObj[key] = obj[key]
                        break
                    case "object":
                        if (obj[key] instanceof EnumValue) {
                            newObj[key] = (obj[key] as EnumValue).ordinal
                        }
                        else if (obj[key] instanceof Array) {
                            newObj[key] = (obj[key] as any[]).map((item) => copyProps(item))
                        }
                        else {
                            newObj[key] = copyProps(obj[key])                           
                        }
                        break
                }
            }

            if (obj instanceof ValueBonus) {
                newObj["affectedType"] = (obj as ValueBonus).affected instanceof StatTypeValue
                    ? "stat" : "skill"
            }

            return newObj
        }

        let state = this.props.state

        return copyProps(state)
    }

    private onSaveClicked = () => {
        let savePath = path.join(remote.app.getPath("appData"), "pfCharSheets", this.props.state.character.name + ".sav")
        remote.dialog.showSaveDialog({
            title: "Save Character",
            defaultPath: savePath
        }, (path) => {
            jetpack.write(path, JSON.stringify(this.stateAsSav(), null, 4))
        })
    }

    private onLoadClicked = () => {
        remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
            defaultPath: path.join(remote.app.getPath("appData"), "pfCharSheets"),
            filters: [{ name: "Character Save Files", extensions: ["sav"] }],
            properties: ["openFile"]
        }, (paths: string[]) => {
            if (paths.length > 0) {
                let loadPath = paths[0]
                this.props.load(loadPath)
            }
        })
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

function mapStateToProps(state: CharacterSheetState): StateProps {
    return {
        state
    }
}

function mapDispatchToProps(dispatch): DispatchProps {
    return {
        load: path => dispatch(loadCharacter(path)),
        addAttack: (attack, equip) => dispatch(addAttack(attack, equip)),
        addFeat: feat => dispatch(addFeat(feat)),
        addEquip: equip => dispatch(addEquip(equip))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolbarContainer)