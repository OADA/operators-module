import React from "react";
import { withStyles } from "material-ui/styles";
import { connect } from "@cerebral/react";
import { state, signal } from "cerebral/tags";
import { TextField, Button } from "material-ui";

const styles = theme => ({
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
    color: "#FAFAFA",
  }
});

class EditOperatorDrawer extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.operatorDrawer}>
        <div className={classes.drawerHeader}>
          <label htmlFor="Instructions">
            {"(1) Enter names (2) Save"}
          </label>
        </div>
        <div className={classes.operatorDrawerBottom}>
          <div className={classes.editOperatorText}>
            <TextField
              label="Operator name"
              placeholder={`e.g., "Bob"`}
              value={this.props.firstNameText}
              onChange={evt =>
                this.props.firstNameTextChanged({ value: evt.target.value })
              }
            />
            <TextField
              label='Last Name'
              placeholder={`e.g., "Alice"`}
              type='lastname'
              value={this.props.lastNameText}
              onChange={(evt)=>this.props.lastNameTextChanged({value: evt.target.value})}
            />
          </div>
          <div className={classes.editOperatorButtons}>
            <Button
              className={classes.editOperatorButton}
              variant="raised"
              color="primary"
              onClick={() => {this.props.saveEdited({})}}
              disabled={this.props.disabledNewOperator}
            >
              Save
            </Button>
            <Button
              className={classes.editOperatorButton}
              variant="raised"
              color="secondary"
              onClick={() => {this.props.cancelNewOperator()}}
            >
              Discard
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  {
    firstNameText:           state`operators.new_operator.firstName`,
    lastNameText:            state`operators.new_operator.lastName`,
    operators:               state`operators.records`,
    operatorSuggestionsOpen: state`operators.new_operator.operator.suggestionsOpen`,
    operatorId:              state`operators.new_operator.id`,
    disabledNewOperator:     state`operators.newOperatorDisabled`,

    addOperatorClicked:      signal`operators.addOperatorClicked`,
    firstNameTextChanged:    signal`operators.firstNameTextChanged`,
    lastNameTextChanged:     signal`operators.lastNameTextChanged`,
    saveEdited:              signal`operators.saveEditedOperator`,
    cancelNewOperator:       signal`operators.cancelNewOperator`
  },
  withStyles(styles, { withTheme: true })(EditOperatorDrawer)
);

