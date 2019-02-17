"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["operators.records"], ["operators.records"]),
    _templateObject2 = _taggedTemplateLiteral(["operators.current"], ["operators.current"]),
    _templateObject3 = _taggedTemplateLiteral(["operators.setCurrentOperator"], ["operators.setCurrentOperator"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react3 = require("@cerebral/react");

var _tags = require("cerebral/tags");

var _TextField = require("material-ui/TextField");

var _TextField2 = _interopRequireDefault(_TextField);

var _Menu = require("material-ui/Menu");

var _styles = require("material-ui/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = function styles(theme) {
	return {
		textField: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "flex-start",
			marginRight: theme.spacing.unit,
			minWidth: "200px",
			width: "20%",
			color: "#FAFAFA",
			rightPadding: 10
		}
	};
};

var OperatorsList = function (_React$Component) {
	_inherits(OperatorsList, _React$Component);

	function OperatorsList() {
		_classCallCheck(this, OperatorsList);

		return _possibleConstructorReturn(this, (OperatorsList.__proto__ || Object.getPrototypeOf(OperatorsList)).apply(this, arguments));
	}

	_createClass(OperatorsList, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var classes = this.props.classes;

			return _react2.default.createElement(
				_TextField2.default,
				{
					select: true,
					fullwidth: true,
					className: classes.textField,
					label: "Operator",
					InputLabelProps: {
						shrink: true,
						style: { color: "white" }
					},
					value: this.props.currentOperator,
					onChange: function onChange(event) {
						_this2.props.setCurrentOperator({
							operator: event.target.value
						});
					},
					InputProps: {
						style: { color: "white" }
					}

				},
				Object.values(this.props.operators).map(function (operator) {
					return _react2.default.createElement(
						_Menu.MenuItem,
						{
							key: operator.label,
							value: operator.label,
							selected: true
						},
						operator.label
					);
				})
			);
		}
	}]);

	return OperatorsList;
}(_react2.default.Component);

OperatorsList.propTypes = {
	classes: _propTypes2.default.object.isRequired,
	theme: _propTypes2.default.object.isRequired
};

exports.default = (0, _react3.connect)({
	operators: (0, _tags.state)(_templateObject),
	currentOperator: (0, _tags.state)(_templateObject2),

	setCurrentOperator: (0, _tags.signal)(_templateObject3)
}, (0, _styles.withStyles)(styles, { withTheme: true })(OperatorsList));