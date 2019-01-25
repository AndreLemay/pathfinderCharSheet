import * as React from "react"
import { connect } from "react-redux"
import Toolbar from "../components/Toolbar";
import { loadCharacter, addAttack, addFeat, addEquip } from "../store/actions/toolbarActions";
import CharacterSheetState, { EquipmentState, ValueBonus, FeatState, AttackState } from "../store/types";
import { AttackInfoBundle } from "../components/AttackModal";
import { remote } from "electron";
import * as path from "path"
import * as jetpack from "fs-jetpack"
import { EnumValue } from "ts-enums";
import { StatTypeValue } from "../api/enums";
import uuid = require("uuid");
import { EquipInfoBundle } from "../components/EquipmentModal";
import { FeatInfoBundle } from "../components/FeatModal";

interface OwnProps {
    openFeatModal: (onSave: (state: FeatState) => void, feat?: FeatState) => void
    openEquipModal: (onSave: (state: EquipmentState) => void, equip?: EquipmentState) => void
    openAttackModal: (onSave: (state: AttackInfoBundle) => void, attack?: AttackState) => void
}

interface StateProps {
    state: CharacterSheetState
}

interface DispatchProps {
    load: (path: string) => void
    addFeat: (feat: FeatState) => void
    addEquip: (equip: EquipmentState) => void
    addAttack: (attack: AttackState, equip: EquipmentState) => void
}

type ToolbarContainerProps = OwnProps & StateProps & DispatchProps

class ToolbarContainer extends React.Component<ToolbarContainerProps> {    
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
        this.props.openFeatModal(this.addFeat)
    }

    private onAddEquipClicked = () => {
        this.props.openEquipModal(this.addEquipment)
    }

    private onAddAttackClicked = () => {
        this.props.openAttackModal(this.addAttack)
    }

    private addEquipment = (bundle: EquipInfoBundle) => {
        this.props.addEquip({
            uuid: uuid.v4(),
            ...bundle
        })
    }

    private addFeat = (bundle: FeatInfoBundle) => {
        this.props.addFeat({
            uuid: uuid.v4(),
            ...bundle,
            active: true
        })
    }

    private addAttack = (bundle: AttackInfoBundle) => {
        let { name, description, bonuses, range, type, dmgDieCount, dmgDie, critRange, critMultiplier } = bundle
        let equip: EquipmentState = {
            uuid: uuid.v4(),
            name,
            description,
            bonuses
        }
        let attack: AttackState = {
            uuid: uuid.v4(),
            name,
            description,
            range,
            type,
            dmgDieCount,
            dmgDie,
            critRange,
            critMultiplier,
            equipId: equip.uuid
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