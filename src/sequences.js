import { sequence } from "cerebral";
import { set, when } from "cerebral/operators";
import { state, props } from "cerebral/tags";
import Promise from "bluebird";
import oada from "@oada/cerebral-module/sequences";

let signals = [];
const _TYPE = "application/vnd.oada.yield.1+json";

let tree = {
  'bookmarks': {
    '_type': 'application/vnd.oada.bookmarks.1+json',
    '_rev': '0-0',
    'operators': {
      '_type': _TYPE,
      '_rev': '0-0',
      '*': {
        '_type': _TYPE, 
        '_rev': '0-0',
      }
    }
  }
};

export const fetch = sequence("operators.fetch", [
  ({ state, props }) => {
    let signals = props.signals ? props.signals : [];
    let watch = { signals: [...signals] };
    let requests = [
      {
        tree: tree,
        path: "/bookmarks/operators",
        watch: watch
      }
    ];
    return { requests };
  },
  oada.get,
  when(state`oada.${props`connection_id`}.bookmarks.operators`),
  {
    true: sequence("fetchOperatorsSuccess", [mapOadaToRecords]),
    false: sequence("fetchOperatorsFailed", [])
  }
]);

export const setFetchWatch = sequence("operators.updateFetchWatch", [
  ({ props }) => {
    signals = props.signals;
  }
]);

export const getFetchWatch = sequence("operators.updateFetchWatch", [
  ({ props }) => ({ signals })
]);

export const init = sequence("operators.init", [
  oada.connect,
  set(state`operators.connection_id`, props`connection_id`),
  set(state`operators.loading`, true),
  fetch,
  set(state`operators.loading`, false),
  set(props`type`, "operators")
]);

export const selectOperator = sequence("operators.selectOperator", []);

export function mapOadaToRecords({ props, state }) {
  let connection_id = state.get('operators.connection_id');
  let operators = state.get('operators.records');

  return Promise.map(Object.keys(operators || {}), (operator) => {
    return state.unset(`operators.records.${operator}`)
  }).then(() => {
    let operators = state.get(`oada.${connection_id}.bookmarks.operators`);
    if (operators) {
      return Promise.map(Object.keys(operators || {}), (operator) => {
        if (operators[operator] && operators[operator].firstName) {
          let id =        operators[operator].id;
          let lastName =  operators[operator].lastName;
          let firstName = operators[operator].firstName;
          let label =     operators[operator].label;
          let record = {
            id:        id,
            firstName: firstName,
            lastName:  lastName,
            label:     label
          };
          return state.set(`operators.records.${id}`, record);
        } else {
          return;
        }
      });
    } else return
  }).then(() => {
    return
  })
}

export const deleteOperator = sequence("operators.deleteOperator", [
  ({ props, state }) => ({
    connection_id: state.get("operators.connection_id"),
    tree,
    path: "/bookmarks/operators"
  })
]);

export const updateOperator = sequence("operators.updateOperator", [
  ({ props, state }) => ({
    connection_id: state.get("operators.connection_id"),
    tree,
    path: "/bookmarks/operators",
    data: props.data
  }),
  oada.put
]);

function createOperator({props, state}) {
  let operator = {
    _id:       'resources/' + props.item.id,
    id:        props.item.id,
    firstName: props.item.firstName,
    lastName:  props.item.lastName,
    label:     props.item.firstName + " " + props.item.lastName
  };
  return {id: props.item.id, operator}
}

export const createNewOperator = sequence("operators.createNewOperator", [
  createOperator,
  ({ props, state }) => ({
    data: props.operator,
    type: _TYPE,
    path: "/bookmarks/operators/" + props.operator._id,
    connection_id: state.get("operators.connection_id"),
    tree
  }),
  oada.put,
  fetch
]);
