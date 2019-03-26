import * as React from "react"
import * as path from "path"
import * as jetpack from "fs-jetpack"
import { remote } from "electron"
import { ToolbarProps } from "../../shared/api/componentPropTypes";

interface OwnState {
    dropdownOpen: boolean
}

export default class Toolbar extends React.Component<ToolbarProps, OwnState> {
    constructor(props) {
        super(props)
        this.state = {
            dropdownOpen: false
        }
    }

    toggle() {
        this.setState((prevState) => {
            return { dropdownOpen: !prevState.dropdownOpen }
        })
    }

    onSaveClicked = () => {
        let savePath = path.join(remote.app.getPath("appData"), "pfCharSheets", `${this.props.defaultSaveName()}.sav`)
        remote.dialog.showSaveDialog({
            title: "Save Character",
            defaultPath: savePath
        }, (path) => {
            jetpack.write(path.endsWith(".sav") ? path : `${path}.sav`, this.props.getSaveFile())
        })
    }

    onLoadClicked = () => {
        remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
            defaultPath: path.join(remote.app.getPath("appData"), "pfCharSheets"),
            filters: [{ name: "Character Save Files", extensions: ["sav"] }],
            properties: ["openFile"]
        }, (paths: string[]) => {
            if (paths && paths.length > 0) {
                let loadPath = paths[0]
                this.props.load(jetpack.read(loadPath, "json"))
            }
        })
    }

    render() {
        return (
            <div className="navbar fixed-top navbar-expand navbar-dark bg-dark">
                <div className="navbar-nav">
                    <div className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" id="fileMenuLink" role="button" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">File</a>
                        <div className="dropdown-menu" aria-labelledby="fileMenuLink">
                            <a className="dropdown-item" href="#" onClick={this.onSaveClicked}>Save</a>
                            <a className="dropdown-item" href="#" onClick={this.onLoadClicked}>Load</a>
                        </div>
                    </div>
                    <div className="nav-item">
                        <a href="#" className="nav-link" onClick={this.props.addEquip}>Add Equipment</a>
                    </div>
                    <div className="nav-item">
                        <a href="#" className="nav-link" onClick={this.props.addAttack}>Add Attack</a>
                    </div>
                    <div className="nav-item">
                        <a href="#" className="nav-link" onClick={this.props.addFeat}>Add Feat</a>
                    </div>
                </div>
            </div>
        )
    }
}