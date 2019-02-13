"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["operators.new_operator.firstName"], ["operators.new_operator.firstName"]),
    _templateObject2 = _taggedTemplateLiteral(["operators.new_operator.lastName"], ["operators.new_operator.lastName"]),
    _templateObject3 = _taggedTemplateLiteral(["operators.records"], ["operators.records"]),
    _templateObject4 = _taggedTemplateLiteral(["operators.new_operator.operator.suggestionsOpen"], ["operators.new_operator.operator.suggestionsOpen"]),
    _templateObject5 = _taggedTemplateLiteral(["operators.new_operator.id"], ["operators.new_operator.id"]),
    _templateObject6 = _taggedTemplateLiteral(["operators.newOperatorDisabled"], ["operators.newOperatorDisabled"]),
    _templateObject7 = _taggedTemplateLiteral(["operators.addOperatorClicked"], ["operators.addOperatorClicked"]),
    _templateObject8 = _taggedTemplateLiteral(["operators.firstNameTextChanged"], ["operators.firstNameTextChanged"]),
    _templateObject9 = _taggedTemplateLiteral(["operators.lastNameTextChanged"], ["operators.lastNameTextChanged"]),
    _templateObject10 = _taggedTemplateLiteral(["operators.saveEditedOperator"], ["operators.saveEditedOperator"]),
    _templateObject11 = _taggedTemplateLiteral(["operators.cancelNewOperator"], ["operators.cancelNewOperator"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styles = require("material-ui/styles");

var _react3 = require("@cerebral/react");

var _tags = require("cerebral/tags");

var _materialUi = require("material-ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = function styles(theme) {
  return {
    drawerHeader: {
      display: "flex",
      flexDirection: "row",
      flexGrow: 2,
      alignItems: "center",
      backgroundColor: "#3f51b5",
      color: "white",
      justifyContent: "center",
      width: "100%",
      padding: "10px"
    },
    hide: {
      display: "none"
    },
    editOperatorButtons: {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      flexDirection: "column"
    },
    editOperatorText: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      alignItems: "center",
      height: "128px"
    },
    operatorDrawerBottom: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      width: "100%"
    },
    operatorDrawer: {
      display: "flex",
      flexDirection: "column",
      order: 3,
      alignItems: "center"
    },
    textOperator: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      marginRight: theme.spacing.unit * 0.25,
      minWidth: "200px",
      width: "20%",
      color: "#FAFAFA"
    }
  };
};

var EditOperatorDrawer = function (_React$Component) {
  _inherits(EditOperatorDrawer, _React$Component);

  function EditOperatorDrawer() {
    _classCallCheck(this, EditOperatorDrawer);

    return _possibleConstructorReturn(this, (EditOperatorDrawer.__proto__ || Object.getPrototypeOf(EditOperatorDrawer)).apply(this, arguments));
  }

  _createClass(EditOperatorDrawer, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var classes = this.props.classes;


      return _react2.default.createElement(
        "div",
        { className: classes.operatorDrawer },
        _react2.default.createElement(
          "div",
          { className: classes.drawerHeader },
          _react2.default.createElement(
            "label",
            { htmlFor: "Instructions" },
            "(1) Enter names (2) Save"
          )
        ),
        _react2.default.createElement(
          "div",
          { className: classes.operatorDrawerBottom },
          _react2.default.createElement(
            "div",
            { className: classes.editOperatorText },
            _react2.default.createElement(_materialUi.TextField, {
              label: "Operator name",
              placeholder: "e.g., \"Bob\"",
              value: this.props.firstNameText,
              onChange: function onChange(evt) {
                return _this2.props.firstNameTextChanged({ value: evt.target.value });
              }
            }),
            _react2.default.createElement(_materialUi.TextField, {
              label: "Last Name",
              placeholder: "e.g., \"Alice\"",
              type: "lastname",
              value: this.props.lastNameText,
              onChange: function onChange(evt) {
                return _this2.props.lastNameTextChanged({ value: evt.target.value });
              }
            })
          ),
          _react2.default.createElement(
            "div",
            { className: classes.editOperatorButtons },
            _react2.default.createElement(
              _materialUi.Button,
              {
                className: classes.editOperatorButton,
                variant: "raised",
                color: "primary",
                onClick: function onClick() {
                  _this2.props.saveEdited({});
                },
                disabled: this.props.disabledNewOperator
              },
              "Save"
            ),
            _react2.default.createElement(
              _materialUi.Button,
              {
                className: classes.editOperatorButton,
                variant: "raised",
                color: "secondary",
                onClick: function onClick() {
                  _this2.props.cancelNewOperator();
                }
              },
              "Discard"
            )
          )
        )
      );
    }
  }]);

  return EditOperatorDrawer;
}(_react2.default.Component);

exports.default = (0, _react3.connect)({
  firstNameText: (0, _tags.state)(_templateObject),
  lastNameText: (0, _tags.state)(_templateObject2),
  operators: (0, _tags.state)(_templateObject3),
  operatorSuggestionsOpen: (0, _tags.state)(_templateObject4),
  operatorId: (0, _tags.state)(_templateObject5),
  disabledNewOperator: (0, _tags.state)(_templateObject6),

  addOperatorClicked: (0, _tags.signal)(_templateObject7),
  firstNameTextChanged: (0, _tags.signal)(_templateObject8),
  lastNameTextChanged: (0, _tags.signal)(_templateObject9),
  saveEdited: (0, _tags.signal)(_templateObject10),
  cancelNewOperator: (0, _tags.signal)(_templateObject11)
}, (0, _styles.withStyles)(styles, { withTheme: true })(EditOperatorDrawer));

