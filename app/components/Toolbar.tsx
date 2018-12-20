import * as React from "react"

interface OwnProps {
    className?: string
}

interface DispatchProps {
    save: () => void
    load: () => void
    addEquip: () => void
    addFeat: () => void
    addAttack: () => void
}

interface OwnState {
    dropdownOpen: boolean
}

type ToolbarProps = DispatchProps & OwnProps

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

    render() {
        return (
            <div className="navbar sticky-top navbar-expand navbar-dark bg-dark">
                <div className="navbar-nav">
                    <div className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" id="fileMenuLink" role="button" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">File</a>
                        <div className="dropdown-menu" aria-labelledby="fileMenuLink">
                            <a className="dropdown-item" href="#" onClick={this.props.save}>Save</a>
                            <a className="dropdown-item" href="#" onClick={this.props.load}>Load</a>
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