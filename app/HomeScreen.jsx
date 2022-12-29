import React, { useState, useEffect } from 'react';
import {
	StyleSheet, Text, View, TextInput, Button, Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';
import moment from 'moment';
import Constants from 'expo-constants';

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
	stack: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	stackLetter: {
		fontSize: 20,
	},
	version: {
		fontSize: 15,
		position: 'absolute',
		bottom: 0,
		right: 0,
	}
});

export default function App() {
	const initialDailyHours = [
		{
			id: 'M',
			hours: '8',
		},
		{
			id: 'T',
			hours: '8',
		},
		{
			id: 'W',
			hours: '8',
		},
		{
			id: 'Th',
			hours: '8',
		},
		{
			id: 'F',
			hours: '0',
		},
	];
	const [hoursNeeded, updateHoursNeeded] = useState('40');
	const [hoursWorked, updateHoursWorked] = useState('32');
	const [dailyHours, updateDailyHours] = useState(initialDailyHours);
	const [hoursRemaining, updateHoursRemaining] = useState('8');
	const [hoursSum, updateHoursSum] = useState('8');
	const [lunchHours, updateLunchHours] = useState('30');
	const [lunchBox, updateLunchBox] = useState(true);
	const [dayStart, updateDayStart] = useState(new Date(new Date().setHours(8, 0, 0, 0)));
	const [showBanner, updateBanner] = useState(false);
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

	useEffect(() => {
		const totalHoursWorked = dailyHours.reduce((accumulator, object) => accumulator + Number(object.hours), 0);
		updateHoursWorked(totalHoursWorked.toString());
		const remainingHours = (Math.round(((hoursNeeded - totalHoursWorked) * 100)) / 100);
		updateHoursRemaining(remainingHours);
		if (remainingHours < 6) {
			updateLunchBox(false);
		} else {
			updateLunchBox(true);
		}
		let lunchMinutes = 0;
		if (lunchBox) {
			lunchMinutes = lunchHours;
		} else;

		updateHoursSum((remainingHours * 60 + parseInt(lunchMinutes)) / 60);
		updateBanner(false);
	}, [dailyHours, dayStart, hoursNeeded]);

	function randomImage(arr) {
		const randomIndex = Math.floor(Math.random() * arr.length);
		const image = arr[randomIndex];
		return image;
	}

	function updateStart(e, date) {
		const hours = date.getHours();
		const minutes = date.getMinutes();
		console.log('day start function');
		updateDayStart(new Date(new Date().setHours(hours, minutes)));
	}

	function updateWorked(id, text) {
		const newHours = dailyHours.map((item) => {
			if (item.id === id) {
				const updatedItem = {
					...item,
					hours: text,
				};
				return updatedItem;
			}
			return item;
		});
		updateDailyHours(newHours);
	}

	function calculate() {
		let lunchMinutes = 0;
		if (lunchBox) {
			lunchMinutes = lunchHours;
		} else;

		const hours = parseFloat(dayStart.getHours()) + parseFloat(hoursRemaining);
		const totalMinutes = (hours * 60) + dayStart.getMinutes() + parseInt(lunchMinutes);
		const earlyFinish = (new Date(new Date().setHours(0, totalMinutes - 7)));
		const lateFinish = (new Date(new Date().setHours(0, totalMinutes + 7)));

		updateClockOutEarly(moment(earlyFinish).format('h:mm A'));
		updateClockOutLate(moment(lateFinish).format('h:mm A'));
		updateBanner(true);
	}

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.titleText}>You rock, SJ!</Text>
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
						editable="false"
					/>
				</View>
				<View style={styles.row}>
					{dailyHours.map((item) => (
						<View style={styles.stack} key={item.id}>
							<Text style={styles.stackLetter}>
								{item.id}
							</Text>
							<TextInput
								style={styles.box}
								value={item.hours.toString()}
								onChangeText={(text) => updateWorked(item.id, text)}
							/>
						</View>
					))}
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
								You will need to work:
								{' '}
								{hoursSum}
								{' '}
								hours
							</Text>
							<Text style={styles.rowText}>
								Earliest clock out:
								{' '}
								{clockOutEarly}
							</Text>
							<Text style={styles.rowText}>
								Latest clock out:
								{' '}
								{clockOutLate}
							</Text>
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
				<Text style={styles.version}>
								{`v${Constants.manifest.version}`}
</Text>
			</View>
		</View>
	);
}
