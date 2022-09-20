import React, { useState } from 'react';
import {
	StyleSheet, Text, View, TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';

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
	const [hoursNeeded, updateHoursNeeded] = useState('40');
	const [hoursWorked, updateHoursWorked] = useState('0');
	const [lunchHours, updateLunchHours] = useState('30');
	const [lunchBox, updateLunchBox] = useState(false);
	const [dayStart, updateDayStart] = useState(new Date(new Date().setHours(8, 0, 0, 0)));

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
			<View style={styles.row}>
				<Text style={styles.rowText}>
					Taking Lunch?:
				</Text>
				<Checkbox
					style={{ padding: 10, margin: 12 }}
					value={lunchBox}
					onValueChange={updateLunchBox}
				/>
				{lunchBox && (
					<TextInput
						style={styles.box}
						value={lunchHours}
						onChange={updateLunchHours}
					/>
				) }
			</View>
			<View style={styles.row}>
				<Text style={styles.rowText}>
					Start time:
				</Text>
				<DateTimePicker
					mode="time"
					value={dayStart}
					onChange={(date) => updateDayStart}
					display="default"
					style={{
						width: 100,
					}}
				/>
			</View>
		</View>
	);
}
