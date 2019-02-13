"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNewOperator = exports.updateOperator = exports.deleteOperator = exports.selectOperator = exports.init = exports.getFetchWatch = exports.setFetchWatch = exports.fetch = undefined;

var _templateObject = _taggedTemplateLiteral(["oada.", ".bookmarks.operators"], ["oada.", ".bookmarks.operators"]),
    _templateObject2 = _taggedTemplateLiteral(["connection_id"], ["connection_id"]),
    _templateObject3 = _taggedTemplateLiteral(["operators.connection_id"], ["operators.connection_id"]),
    _templateObject4 = _taggedTemplateLiteral(["operators.loading"], ["operators.loading"]),
    _templateObject5 = _taggedTemplateLiteral(["type"], ["type"]);

exports.mapOadaToRecords = mapOadaToRecords;

var _cerebral = require("cerebral");

var _operators = require("cerebral/operators");

var _tags = require("cerebral/tags");

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _sequences = require("@oada/cerebral-module/sequences");

var _sequences2 = _interopRequireDefault(_sequences);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var signals = [];
var _TYPE = "application/vnd.oada.yield.1+json";

var tree = {
  'bookmarks': {
    '_type': 'application/vnd.oada.bookmarks.1+json',
    '_rev': '0-0',
    'operators': {
      '_type': _TYPE,
      '_rev': '0-0',
      '*': {
        '_type': _TYPE,
        '_rev': '0-0'
      }
    }
  }
};

var fetch = exports.fetch = (0, _cerebral.sequence)("operators.fetch", [function (_ref) {
  var state = _ref.state,
      props = _ref.props;

  var signals = props.signals ? props.signals : [];
  var watch = { signals: [].concat(_toConsumableArray(signals)) };
  var requests = [{
    tree: tree,
    path: "/bookmarks/operators",
    watch: watch
  }];
  return { requests: requests };
}, _sequences2.default.get, (0, _operators.when)((0, _tags.state)(_templateObject, (0, _tags.props)(_templateObject2))), {
  true: (0, _cerebral.sequence)("fetchOperatorsSuccess", [mapOadaToRecords]),
  false: (0, _cerebral.sequence)("fetchOperatorsFailed", [])
}]);

var setFetchWatch = exports.setFetchWatch = (0, _cerebral.sequence)("operators.updateFetchWatch", [function (_ref2) {
  var props = _ref2.props;

  signals = props.signals;
}]);

var getFetchWatch = exports.getFetchWatch = (0, _cerebral.sequence)("operators.updateFetchWatch", [function (_ref3) {
  var props = _ref3.props;
  return { signals: signals };
}]);

var init = exports.init = (0, _cerebral.sequence)("operators.init", [_sequences2.default.connect, (0, _operators.set)((0, _tags.state)(_templateObject3), (0, _tags.props)(_templateObject2)), (0, _operators.set)((0, _tags.state)(_templateObject4), true), fetch, (0, _operators.set)((0, _tags.state)(_templateObject4), false), (0, _operators.set)((0, _tags.props)(_templateObject5), "operators")]);

var selectOperator = exports.selectOperator = (0, _cerebral.sequence)("operators.selectOperator", []);

function mapOadaToRecords(_ref4) {
  var props = _ref4.props,
      state = _ref4.state;

  var connection_id = state.get('operators.connection_id');
  var operators = state.get('operators.records');

  return _bluebird2.default.map(Object.keys(operators || {}), function (operator) {
    return state.unset("operators.records." + operator);
  }).then(function () {
    var operators = state.get("oada." + connection_id + ".bookmarks.operators");
    if (operators) {
      return _bluebird2.default.map(Object.keys(operators || {}), function (operator) {
        if (operators[operator] && operators[operator].firstName) {
          var id = operators[operator].id;
          var lastName = operators[operator].lastName;
          var firstName = operators[operator].firstName;
          var label = operators[operator].label;
          var record = {
            id: id,
            firstName: firstName,
            lastName: lastName,
            label: label
          };
          return state.set("operators.records." + id, record);
        } else {
          return;
        }
      });
    } else return;
  }).then(function () {
    return;
  });
}

var deleteOperator = exports.deleteOperator = (0, _cerebral.sequence)("operators.deleteOperator", [function (_ref5) {
  var props = _ref5.props,
      state = _ref5.state;
  return {
    connection_id: state.get("operators.connection_id"),
    tree: tree,
    path: "/bookmarks/operators"
  };
}]);

var updateOperator = exports.updateOperator = (0, _cerebral.sequence)("operators.updateOperator", [function (_ref6) {
  var props = _ref6.props,
      state = _ref6.state;
  return {
    connection_id: state.get("operators.connection_id"),
    tree: tree,
    path: "/bookmarks/operators",
    data: props.data
  };
}, _sequences2.default.put]);

function createOperator(_ref7) {
  var props = _ref7.props,
      state = _ref7.state;

  var operator = {
    _id: 'resources/' + props.item.id,
    id: props.item.id,
    firstName: props.item.firstName,
    lastName: props.item.lastName,
    label: props.item.firstName + " " + props.item.lastName
  };
  return { id: props.item.id, operator: operator };
}

var createNewOperator = exports.createNewOperator = (0, _cerebral.sequence)("operators.createNewOperator", [createOperator, function (_ref8) {
  var props = _ref8.props,
      state = _ref8.state;
  return {
    data: props.operator,
    type: _TYPE,
    path: "/bookmarks/operators/" + props.operator._id,
    connection_id: state.get("operators.connection_id"),
    tree: tree
  };
}, _sequences2.default.put, fetch]);