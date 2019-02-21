import { Module } from 'cerebral'
import * as signals from './sequences'
console.log('signals', signals);
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
