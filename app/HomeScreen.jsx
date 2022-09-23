import React, { useState } from 'react';
import {
	StyleSheet, Text, View, TextInput, Button, Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';
import moment from 'moment';
import OllieImage from '../assets/ollie.png';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#d9cff2',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 50,
		padding: 20,
	},
	titleContainer: {
		flex: 1,
	},
	contentContainer: {
		flex: 4,
	},
	titleText: {
		paddingTop: 45,
		fontSize: '45',
	},
	rowText: {
		fontSize: '20',
	},
	box: {
		fontSize: '20',
		borderWidth: 1,
		borderRadius: 6,
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
	const [hoursRemaining, updateHoursRemaining] = useState('8');
	const [hoursSum, updateHoursSum] = useState('8');
	const [lunchHours, updateLunchHours] = useState('30');
	const [lunchBox, updateLunchBox] = useState(true);
	const [dayStart, updateDayStart] = useState(new Date(new Date().setHours(8, 0, 0, 0)));
	const [dayEnd, updateDayEnd] = useState('5:00 PM');
	const [showBanner, updateBanner] = useState(false);

	const Ollie = Image.resolveAssetSource(OllieImage).uri;

	function updateStart(e, date) {
		const hours = date.getHours();
		const minutes = date.getMinutes();
		updateDayStart(new Date(new Date().setHours(hours, minutes)));
	}

	function updateWorked(text) {
		updateHoursWorked(text);
		console.log(text);
	}
	
	function calculate() {
		updateHoursRemaining(Math.round(((hoursNeeded - hoursWorked) * 100)) / 100);
		let minutes = 0;
		if (hoursRemaining < 6 && lunchBox === true) {
			updateLunchBox(false);
		} else if (hoursRemaining >= 6 && lunchBox === false) {
			updateLunchBox(true);
		}
		if (lunchBox) {
			minutes = lunchHours;
		} else;
		const hours = dayStart.getHours() + hoursRemaining;
		const totalMinutes = (hours * 60) + dayStart.getMinutes() + parseInt(minutes);
		const time = (new Date(new Date().setHours(0, totalMinutes)));
		updateHoursSum((hoursRemaining * 60 + parseInt(minutes)) / 60);
		updateDayEnd(moment(time).format('h:mm A'));
		updateBanner(true);
	}

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.titleText}>Happy Friday, SJ!</Text>
			</View>
			<View style={styles.contentContainer}>
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
						onChangeText={(text) => updateWorked(text)}
					/>
				</View>
				<View style={styles.row}>
					<Text style={styles.rowText}>
						Taking Lunch?:
					</Text>
					<Checkbox
						style={{
							padding: 10, margin: 12, borderRadius: 6, borderWidth: 1,
						}}
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
						onChange={(e, date) => updateStart(e, date)}
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
				<View style={styles.row}>
					{showBanner && (
						<View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
							<Text style={styles.rowText}>
								You finish at
								{' '}
								{dayEnd}
								{' '}
								today! You will need to work
								{' '}
								{hoursSum}
								{' '}
								hours
								{lunchBox ? ' (including lunch) ' : ' '}
								today to reach
								{' '}
								{hoursNeeded}
								{' '}
								hours total.
							</Text>
							<Image
								source={{ uri: Ollie }}
								style={{ margin: 10, width: 150, height: 150 }}
							/>
							<Text style={styles.rowText}>
								Ollie is patiently waiting on you!
							</Text>
						</View>
					)}
				</View>
			</View>
		</View>
	);
}
