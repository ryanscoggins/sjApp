import React, { useState } from 'react';
import {
	StyleSheet, Text, View, TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import DateTimePicker from '@react-native-community/datetimepicker';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	titleText: {
		fontSize: '25',
	},
	rowText: {
		fontSize: '20',
	},
	box: {
		fontSize: '20',
		borderWidth: 1,
		padding: 10,
		margin: 12,
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default function App() {
	// const initialDate = new Date(new Date().setHours(0, 0, 0, 0));
	// const [mode, setMode] = useState('date');
	// const onChange = (event, selectedDate) => {
	//     console.log(selectedDate);
	//   };
	const hours = [1, 2, 3, 4];
	const [hoursNeeded, updateHoursNeeded] = useState('40');
	const [hoursWorked, updateHoursWorked] = useState('0');

	return (
		<View style={styles.container}>
			<Text style={styles.titleText}>Here is the beginning of SJ's app!</Text>
			<View style={styles.row}>
				<Text style={styles.rowText}>
					Number of hours needed:
				</Text>
				<TextInput
					style={styles.box}
					value={hoursNeeded}
					onChange={updateHoursNeeded}
				/>
			</View>
			<View style={styles.row}>
				<Text style={styles.rowText}>
					Number of hours worked:
				</Text>
				<TextInput
					style={styles.box}
					value={hoursWorked}
					onChange={updateHoursWorked}
				/>
			</View>

			{/* <DateTimePicker
				value={initialDate}
				mode="time"
				onChange={onChange}
			/> */}
			{/* <StatusBar style="auto" /> */}
		</View>
	);
}
