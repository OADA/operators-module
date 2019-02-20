import React from "react";
import PropTypes from "prop-types";
import { connect } from "@cerebral/react";
import { state, signal } from "cerebral/tags";
import TextField from "material-ui/TextField";
import { MenuItem } from "material-ui/Menu";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
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
});

class OperatorsList extends React.Component {

	render() {
    const { classes } = this.props;
		return (
			<TextField
				select
				fullwidth="true"
				className={classes.textField}
				label={"Operator"}
				InputLabelProps={{
					shrink: true,
					style:  {color: "white"}
				}}
				value = {this.props.currentOperator}
				onChange = {event => {
					this.props.setCurrentOperator({
						operator: event.target.value
					});
				}}
				InputProps={{
					style: {color: "white"}
				}}

			>
				{Object.values(this.props.operators).map(operator => (
					<MenuItem
						key   = {operator.label}
						value = {operator.label}
						selected
					>
						{operator.label}
					</MenuItem>
				))}
			</TextField>
		)
	}

}

OperatorsList.propTypes = {
  classes: PropTypes.object.isRequired,
  theme  : PropTypes.object.isRequired
};

export default connect(
  {
		operators:          state`operators.records`,
    currentOperator:    state`operators.current`,

		setCurrentOperator: signal`operators.setCurrentOperator`
	},
	withStyles(styles, { withTheme: true })(OperatorsList)
);
	

