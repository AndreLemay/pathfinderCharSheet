import { StyleSheet } from 'react-native'

const Styles = StyleSheet.create({
	container: {
		flex: 1
	},
	row: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	col: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'baseline'
	},
	sectionHeader: {
		flex: 0
	},
	picker: {
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: 'black',
		width: '100%'
	},
	label: {
		alignSelf: 'flex-start',
		fontSize: 16,
		color: '#86939e',
		fontFamily: 'sans-serif',
		fontWeight: 'bold',
		marginLeft: 10
	}
})

export default Styles
