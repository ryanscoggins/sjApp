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
	text: {
		fontSize: '25',
	},
	box: {
		fontSize: '25',
	},
});

export default function App() {
	// const initialDate = new Date(new Date().setHours(0, 0, 0, 0));
	// const [mode, setMode] = useState('date');
	// const onChange = (event, selectedDate) => {
	//     console.log(selectedDate);
	//   };
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Here is the beginning of SJ's app!</Text>
			<TextInput
				style={styles.box}
				value="1"
			/>
			{/* <DateTimePicker
				value={initialDate}
				mode="time"
				onChange={onChange}
			/> */}
			<StatusBar style="auto" />
		</View>
	);
}
