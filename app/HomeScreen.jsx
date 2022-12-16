import React, { useState } from 'react';
import {
	StyleSheet, Text, View, TextInput, Button, Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';
import moment from 'moment';

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
	largeText: {
		fontSize: '30',
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
	const [roundedRemaining, updateRoundedRemaining] = useState('8');
	const [clockOutEarly, updateClockOutEarly] = useState('5:00 PM');
	const [clockOutLate, updateClockOutLate] = useState('5:00 PM');

	const images = 		[
		require('../assets/ollie.png'),
		require('../assets/ollie2.jpg'),
		require('../assets/ollie3.png'),
		require('../assets/ollie4.png'),
		require('../assets/ollie5.png'),
		require('../assets/ollie6.png'),
	];

	function randomImage(arr) {
		const randomIndex = Math.floor(Math.random() * arr.length);
		const image = arr[randomIndex];
		return image;
	}

	function updateStart(e, date) {
		const hours = date.getHours();
		const minutes = date.getMinutes();
		updateDayStart(new Date(new Date().setHours(hours, minutes)));
	}

	function updateWorked(text) {
		updateHoursWorked(text);
		const remainingHours = (Math.round(((hoursNeeded - text) * 100)) / 100);
		updateHoursRemaining(remainingHours);
		if (remainingHours < 6) {
			updateLunchBox(false);
		} else {
			updateLunchBox(true);
		}
	}

	function calculate() {
		let lunchMinutes = 0;
		if (lunchBox) {
			lunchMinutes = lunchHours;
		} else;
		const hours = parseFloat(dayStart.getHours()) + parseFloat(hoursRemaining);
		const totalMinutes = (hours * 60) + dayStart.getMinutes() + parseInt(lunchMinutes);
		const exactFinish = (new Date(new Date().setHours(0, totalMinutes)));
		const earlyFinish = (new Date(new Date().setHours(0, totalMinutes - 7)));
		const lateFinish = (new Date(new Date().setHours(0, totalMinutes + 7)));

		updateDayEnd(moment(exactFinish).format('h:mm A'));
		updateClockOutEarly(moment(earlyFinish).format('h:mm A'));
		updateClockOutLate(moment(lateFinish).format('h:mm A'));
		updateHoursSum((hoursRemaining * 60 + parseInt(lunchMinutes)) / 60);
		updateBanner(true);

		let hour = exactFinish.getHours();
		const minutes = exactFinish.getMinutes();
		const quarter = (parseInt((totalMinutes + 7.5) / 15) * 15) % 60;
		let clockOutTime = (new Date(new Date().setHours(hour, quarter)));
		if (quarter === 0 && (minutes > 7 && minutes < 53)) {
			clockOutTime = (new Date(new Date().setHours(hour + 1, quarter)));
		} else if (quarter === 0 && (minutes > 52)) {
			clockOutTime = (new Date(new Date().setHours(hour + 1, quarter)));
		} else;

		console.log(dayEnd);
		console.log(clockOutEarly);
		console.log(clockOutLate);

		// console.log(`roundedRemain: ${roundedRemaining}`);
		// console.log(`quarter: ${quarter}`);
		// console.log(`exact: ${dayEnd}`);
		// console.log(`before function CO: ${moment(clockOutTime).format('h:mm A')}`);

		// if (time > clockOutTime && quarter !== 45) {
		// 	clockOutTime = (new Date(new Date().setHours(hour, quarter + 8)));
		// } else if (time < clockOutTime && quarter !== 0) {
		// 	clockOutTime = (new Date(new Date().setHours(hour, quarter - 7)));
		// } else if (time < clockOutTime && quarter === 0) {
		// 	clockOutTime = (new Date(new Date().setHours(hour + 1, -7)));
		// 	hour += 1;
		// } else if (time > clockOutTime && quarter === 45) {
		// 	clockOutTime = (new Date(new Date().setHours(hour, quarter + 8)));
		// 	hour += 1;
		// } else;

		const roundedTime = new Date(new Date().setHours(hour, (parseInt(((clockOutTime.getMinutes()) + 7.5) / 15) * 15) % 60));

		updateRoundedRemaining(moment(roundedTime).format('h:mm A'));
		// updateClockOut(moment(clockOutTime).format('h:mm A'));
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
							{/* <Text style={styles.largeText}>
								{clockOut}
							</Text> */}
							<Text style={styles.rowText}>
								You will need to work:
								{' '}
								{hoursSum}
								{' '}
								hours
							</Text>
							{/* <Text style={styles.rowText}>
								Exact time:
								{' '}
								{dayEnd}
							</Text>
							<Text style={styles.rowText}>
								Clock out time:
								{' '}
								{clockOut}
							</Text>
							<Text style={styles.rowText}>
								Will round to:
								{' '}
								{roundedRemaining}
							</Text> */}
							<Image
								source={randomImage(images)}
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
