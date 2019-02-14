import { Module } from 'cerebral'
import * as signals from './sequences'
export default Module({

	state : {
		records: {},
		loading: true,
    connection_id: "",
    new_operator: {},
    editing: false,
		newOperatorDisabled: true
	},

	signals,
})
