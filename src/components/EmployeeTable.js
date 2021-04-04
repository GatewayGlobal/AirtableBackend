import React, { useEffect, useState } from "react";
import { useOverrides, Stack } from "@quarkly/components";
import EmployeeCard from "./EmployeeCard";
const defaultProps = {
	"margin-top": "40px"
};
const overrides = {};

const EmployeeTable = props => {
	const {
		children,
		rest
	} = useOverrides(props, overrides, defaultProps);
	const [employees, setEmployees] = useState([]);
	useEffect(() => {
		fetch("https://api.airtable.com/v0/appM12PTpdvjcO032/Employee%20directory", {
			headers: {
				"Authorization": "Bearer key8ws0zyodLemAVD"
			}
		}).then(response => response.json()).then(data => setEmployees(data.records.map(({
			fields
		}) => fields)));
	}, []);
	return <Stack {...rest}>
		{employees.map(employee => <EmployeeCard employee={employee} />)}
	</Stack>;
};

Object.assign(EmployeeTable, { ...Stack,
	defaultProps,
	overrides
});
export default EmployeeTable;