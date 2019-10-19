import * as React from 'react'
import { AttacksSectionProps } from '../../shared/api/componentPropTypes'
import SectionHeader from './common/SectionHeader'
import IndividualAttackContainer from '../../shared/containers/IndividualAttackContainer'
import Attack from './Attack'
import { FlatList, View, Button, ToastAndroid } from 'react-native'

export default function AttacksSection(props: AttacksSectionProps) {
	return (
		<View>
			<FlatList
				data={props.attackAndEquipIds}
				ListHeaderComponent={<SectionHeader label="Attacks" />}
				renderItem={({ item, index }) => {
					let [attackUuid, equipUuid] = item

					return (
						<IndividualAttackContainer
							key={index}
							attackUuid={attackUuid}
							equipUuid={equipUuid}
							openAttackModal={props.openAttackModal}
							attackComponent={Attack}
						/>
					)
				}}
			/>
			<Button
				title="Add"
				onPress={() => {
					props.openAttackModal(() => {
						ToastAndroid.show('Added', ToastAndroid.SHORT)
					})
				}}
			/>
		</View>
	)
}
