import * as React from 'react'
import { connect } from 'react-redux'
import CharacterSheetState from '../store/types'
import {
	getAC,
	getDodgeMod,
	getDeflectionMod,
	getArmourMod,
	getShieldMod,
	getNatMod,
	getSizeMod,
	getFlatFootedAC,
	getTouchAC
} from '../store/selectors/armourClassSelectors'
import { getDexterityBonus } from '../store/selectors/abilityScoreSelectors'
import { ArmourClassProps } from '../api/componentPropTypes'

interface OwnProps {
	className?: string
	armourClassComponent: React.FunctionComponent<ArmourClassProps>
}

interface StateProps {
	ac: number
	flatFooted: number
	touch: number
	dexBonus: number
	dodgeBonus: number
	deflectionBonus: number
	armourBonus: number
	shieldBonus: number
	natBonus: number
	sizeBonus: number
}

type ArmourClassContainerProps = StateProps & OwnProps

class ArmourClassContainer extends React.Component<ArmourClassContainerProps> {
	render() {
		return React.createElement(this.props.armourClassComponent, {
			className: this.props.className,
			ac: this.props.ac,
			flatFooted: this.props.flatFooted,
			touch: this.props.touch,
			dexBonus: this.props.dexBonus,
			dodgeBonus: this.props.dodgeBonus,
			deflectionBonus: this.props.deflectionBonus,
			armourBonus: this.props.armourBonus,
			shieldBonus: this.props.shieldBonus,
			natBonus: this.props.natBonus,
			sizeBonus: this.props.sizeBonus
		})
	}
}

function mapStateToProps(state: CharacterSheetState): StateProps {
	return {
		ac: getAC(state),
		flatFooted: getFlatFootedAC(state),
		touch: getTouchAC(state),
		dexBonus: getDexterityBonus(state),
		dodgeBonus: getDodgeMod(state),
		deflectionBonus: getDeflectionMod(state),
		armourBonus: getArmourMod(state),
		shieldBonus: getShieldMod(state),
		natBonus: getNatMod(state),
		sizeBonus: getSizeMod(state)
	}
}

export default connect(mapStateToProps)(ArmourClassContainer)
