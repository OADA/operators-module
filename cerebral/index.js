'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _cerebral = require('cerebral');

var _sequences = require('./sequences');

var signals = _interopRequireWildcard(_sequences);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = (0, _cerebral.Module)({

	state: {
		records: {},
		loading: true,
		connection_id: "",
		new_operator: {},
		editing: false,
		newOperatorDisabled: true
	},

	signals: signals
});