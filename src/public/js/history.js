import {
	createHashHistory
} from 'history';

const history = createHashHistory()

function navigation(e) {
	switch (e.keyCode) {
		case 72:
			history.push('/#/main')
			return true
		case 66:
			history.goBack(-1)
			return true
	}
}
export {
	navigation,
	history
}
// export default history;