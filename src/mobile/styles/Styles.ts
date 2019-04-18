import { StyleSheet } from "react-native"

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start'
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
    }
})

export default Styles