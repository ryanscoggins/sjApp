import React, { useState } from 'react';
import {
	StyleSheet, Text, View, TextInput, Button,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';
import moment from 'moment';

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
	const [hoursWorked, updateHoursWorked] = useState('32');
	const [lunchHours, updateLunchHours] = useState('30');
	const [lunchBox, updateLunchBox] = useState(false);
	const [dayStart, updateDayStart] = useState(new Date(new Date().setHours(8, 0, 0, 0)));
	const [dayEnd, updateDayEnd] = useState('5:00 PM');

	function calculate() {
		const hoursRemaining = hoursNeeded - hoursWorked;
		let minutes = 0;
		if (lunchBox) {
			minutes = lunchHours;
		} else;
		const hours = dayStart.getHours() + hoursRemaining;
		const totalMinutes = (hours * 60) + parseInt(minutes);
		const time = (new Date(new Date().setHours(0, totalMinutes)));
		updateDayEnd(moment(time).format('h:mm A'));
	}

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
					onChangeText={updateHoursNeeded}
				/>
			</View>
			<View style={styles.row}>
				<Text style={styles.rowText}>
					Number of hours worked:
				</Text>
				<TextInput
					style={styles.box}
					value={hoursWorked}
					onChangeText={updateHoursWorked}
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
						onChangeText={updateLunchHours}
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
					onChange={(date) => updateDayStart(date)}
					display="default"
					style={{
						width: 100,
					}}
				/>
			</View>
			<Button
				onPress={calculate}
				title="Calculate"
			/>
			<Text style={styles.rowText}>
				You finish at
				{' '}
				{dayEnd}
				{' '}
				today!
			</Text>
		</View>
	);
}
