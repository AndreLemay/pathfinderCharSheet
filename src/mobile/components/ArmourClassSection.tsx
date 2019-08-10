import * as React from 'react'
import { ArmourClassProps } from '../../shared/api/componentPropTypes'
import { View } from 'react-native'
import Styles from '../styles/Styles'
import SectionHeader from './common/SectionHeader'
import OutputField from './common/OutputField'

export default function ArmourClassSection(props: ArmourClassProps) {
	return (
		<View>
			<SectionHeader label="Armour Class" />
			<View style={[Styles.row]}>
				<OutputField label="Total" containerStyle={[Styles.col]} value={props.ac} />
				<OutputField label="Base" containerStyle={[Styles.col]} value={10} />
				<OutputField
					label="DEX"
					containerStyle={[Styles.col]}
					value={props.dexBonus}
				/>
			</View>
			<View style={[Styles.row]}>
				<OutputField
					label="Dodge"
					containerStyle={[Styles.col]}
					value={props.dodgeBonus}
				/>
				<OutputField
					label="Deflection"
					containerStyle={[Styles.col]}
					value={props.deflectionBonus}
				/>
				<OutputField
					label="Armour"
					containerStyle={[Styles.col]}
					value={props.armourBonus}
				/>
			</View>
			<View style={[Styles.row]}>
				<OutputField
					label="Shield"
					containerStyle={[Styles.col]}
					value={props.shieldBonus}
				/>
				<OutputField
					label="Natural"
					containerStyle={[Styles.col]}
					value={props.natBonus}
				/>
				<OutputField
					label="Size"
					containerStyle={[Styles.col]}
					value={props.sizeBonus}
				/>
			</View>
			<SectionHeader label="Flat-Footed" />
			<View style={[Styles.row]}>
				<OutputField label="Total" containerStyle={[Styles.col]} value={props.ac} />
				<OutputField label="Base" containerStyle={[Styles.col]} value={10} />
				<OutputField
					label="Deflection"
					containerStyle={[Styles.col]}
					value={props.deflectionBonus}
				/>
			</View>
			<View style={[Styles.row]}>
				<OutputField
					label="Armour"
					containerStyle={[Styles.col]}
					value={props.armourBonus}
				/>
				<OutputField
					label="Shield"
					containerStyle={[Styles.col]}
					value={props.shieldBonus}
				/>
				<OutputField
					label="Natural"
					containerStyle={[Styles.col]}
					value={props.natBonus}
				/>
			</View>
			<View style={[Styles.row]}>
				<OutputField
					label="Size"
					containerStyle={[Styles.col]}
					value={props.sizeBonus}
				/>
			</View>
			<SectionHeader label="Touch" />
			<View style={[Styles.row]}>
				<OutputField label="Total" containerStyle={[Styles.col]} value={props.ac} />
				<OutputField label="Base" containerStyle={[Styles.col]} value={10} />
				<OutputField
					label="DEX"
					containerStyle={[Styles.col]}
					value={props.dexBonus}
				/>
			</View>
			<View style={[Styles.row]}>
				<OutputField
					label="Dodge"
					containerStyle={[Styles.col]}
					value={props.dodgeBonus}
				/>
				<OutputField
					label="Deflection"
					containerStyle={[Styles.col]}
					value={props.deflectionBonus}
				/>
				<OutputField
					label="Size"
					containerStyle={[Styles.col]}
					value={props.sizeBonus}
				/>
			</View>
		</View>
	)
}
