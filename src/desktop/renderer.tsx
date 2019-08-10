import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import * as $ from 'jquery'
// import { remote } from "electron";

/* Remove this stuff when finished, just a debug menu */
// let rightClickPosition = null
// const menu = new remote.Menu()
// const menuItem = new remote.MenuItem({
//     label: 'Inspect Element',
//     click: () => {
//         remote.getCurrentWindow().webContents.inspectElement(rightClickPosition.x, rightClickPosition.y)
//     }
// })
// menu.append(menuItem)

// window.addEventListener('contextmenu', (e) => {
//     e.preventDefault()
//     rightClickPosition = { x: e.x, y: e.y }
//     menu.popup({
//         window: remote.getCurrentWindow()
//     })
// }, false)
/* --------------------------------------------------- */

window.onload = () => {
	ReactDOM.render(<App />, $('#app')[0])
}
