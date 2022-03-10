import React, { useEffect } from "react";
import {View,Text,TouchableOpacity,StyleSheet } from 'react-native';
import DailyIframe from "@daily-co/daily-js";
import videoImage from "./editor-image.png";


const DailyVideoChat = (props) => {


	const { 
		apikey,
		editor,
		videoCall,
		createRoomButton,
		createMeetingTokenButton,
		deleteRoomButton,
		updateRoomSettingsButton } = props;

	//videocallprops
	const {token, 
		url, 
		accent,
		accentText,
		background,
		backgroundAccent,
		baseText,
		border,
		mainAreaBg,
		mainAreaBgAccent,
		mainAreaText,
		supportiveText,
		joinedMeeting,
		leftMeeting} = videoCall;


		//createRoomButton props
		const {
		privacy,
		enable_prejoin_ui,
		enable_chat,
		owner_only_broadcast,
		enable_knocking,
		start_video_off,
		start_audio_off,
		roomCreated} = createRoomButton;

		//createMeetingTokenButton props

		const {
			room_name,
			username,
			is_owner,
			start_video_off_t,
			start_audio_off_t,
			meeting_token_created} = createMeetingTokenButton;

	//deleteRoomButton props
	const {
		room_name_d,
		room_deleted,
	} = deleteRoomButton;

//updateRoomSettingsButton props
	const {
		room_name_u,
		privacy_u,
		enable_chat_u,
		owner_only_broadcast_u,
		enable_knocking_u,
		start_video_off_u,
		start_audio_off_u,
		roomUpdated
	} = updateRoomSettingsButton;


//starting the button onPress functions

	const endpointurl = "https://api.daily.co/v1/";

	//action for creating a room
	const createRoomAction = () => {
	
		fetch(endpointurl + "rooms/", { 
		method: "POST",
		headers: {
			 Accept: "application/json",
				Authorization: "Bearer " + apikey,
				"Content-Type": "application/json"
		},
		body: JSON.stringify({properties: {
			enable_network_ui: false,
			enable_new_call_ui: true,
			enable_prejoin_ui: enable_prejoin_ui,
			enable_screenshare: false,
			enable_chat: enable_chat,
			owner_only_broadcast: owner_only_broadcast,
			enable_knocking: enable_knocking,
			start_video_off: start_video_off,
			start_audio_off: start_audio_off,
 },
	privacy: privacy}),
})
				.then((response) => response.json())
				.then(result => {
					console.log('Success:', result);
					console.log('room name:', result.name)
						const name = result.name;
			   const roomUrl = result.url;
						const id = result.id;
					

			   if (roomCreated) roomCreated(name,roomUrl, id);

			})
			.catch(error => {
					console.error('Error:', error);
			});

};

	//action for creating a meeting token
	const meetingTokenAction = () => {
	
		fetch(endpointurl + "meeting-tokens", { 
		method: "POST",
		headers: {
			 Accept: "application/json",
				Authorization: "Bearer " + apikey,
				"Content-Type": "application/json"
		},
		body: JSON.stringify({properties: {
			room_name: room_name,
			is_owner: is_owner,
			username: username,
			start_video_off: start_video_off_t,
			start_audio_off: start_audio_off_t,
 }}),
})
				.then((response) => response.json())
				.then(result => {
					console.log('Success:', result);
					console.log('token', result.token)
						const token = result.token;

			   if (meeting_token_created) meeting_token_created(token);

			})
			.catch(error => {
					console.error('Error:', error);
			});

};

	//action for deleting a room
	const deleteRoomAction = () => {
	
		fetch(endpointurl + "rooms/" + room_name_d, { 
		method: "DELETE",
		headers: {
			 Accept: "application/json",
				Authorization: "Bearer " + apikey,
				"Content-Type": "application/json"
		},
})
				.then((response) => response.json())
				.then(result => {
					console.log('Success:', result);

			   if (room_deleted) room_deleted();

			})
			.catch(error => {
					console.error('Error:', error);
			});

};

	//action for updating a room
	const updateRoomAction = () => {
	
		fetch(endpointurl + "rooms/" + room_name_u, { 
		method: "POST",
		headers: {
			 Accept: "application/json",
				Authorization: "Bearer " + apikey,
				"Content-Type": "application/json"
		},
		body: JSON.stringify({properties: {
			enable_network_ui: false,
			enable_new_call_ui: true,
			enable_prejoin_ui: true,
			enable_screenshare: false,
			enable_chat: enable_chat_u,
			owner_only_broadcast: owner_only_broadcast_u,
			enable_knocking: enable_knocking_u,
			start_video_off: start_video_off_u,
			start_audio_off: start_audio_off_u,
 },
	privacy: privacy_u}),
})
				.then((response) => response.json())
				.then(result => {
					console.log('Success:', result);
					console.log('room name:', result.name)
						const name = result.name;
			   const roomUrl = result.url;
						const id = result.id;
					

			   if (roomUpdated) roomUpdated(name,roomUrl, id);

			})
			.catch(error => {
					console.error('Error:', error);
			});

};

	
//function for joining a call
	function JoinCall() {

				useEffect(() => {
					
					const parentElement = document.querySelector('.daily-call-element');
								const callFrame = DailyIframe.createFrame(parentElement, {
								}); 

								//events
								callFrame.on('left-meeting', ()=> {
									if (leftMeeting) leftMeeting();
									console.log('hey left-meeting', leftMeeting);
								});

								callFrame.on('joined-meeting', ()=> {
									if (joinedMeeting) joinedMeeting();
									console.log('hey joined-meeting', joinedMeeting);
								});

								callFrame.setTheme({
									colors: {
										accent: accent,
										accentText: accentText,
										background: background,
										backgroundAccent: backgroundAccent,
										baseText: baseText,
										border: border,
										mainAreaBg: mainAreaBg,
										mainAreaBgAccent: mainAreaBgAccent,
										mainAreaText: mainAreaText,
										supportiveText:supportiveText,
									},
							});
							 if (token){
								callFrame.join({
										url: url,
										token: token,
										showLeaveButton: true,
										activeSpeakerMode: false,
								})
							};
								if (!token){
									callFrame.join({
											url: url,
											showLeaveButton: true,
											activeSpeakerMode: false,
									})};

				}, [])};
 
	if ( editor ) {
		return (
				<View style={{ width: '100%', height: '100%' }}>
					<img
            src={videoImage}
            style={{ display: videoCall.enabled ? "block" : "none", objectFit: 'fill', width: '100%', height: '100%', padding: 0 }}
          />
										<div style={{display: createRoomButton.enabled ? "block" : "none" }}><TouchableOpacity style={styles.button}><Text style={styles.text}>Create Room</Text></TouchableOpacity></div>
										<div style={{display: deleteRoomButton.enabled ? "block" : "none" }}><TouchableOpacity style={styles.button}><Text style={styles.text}>Delete Room</Text></TouchableOpacity></div>
										<div style={{display: updateRoomSettingsButton.enabled ? "block" : "none" }}><TouchableOpacity style={styles.button}><Text style={styles.text}>Update Room</Text></TouchableOpacity></div>
										<div style={{display: createMeetingTokenButton.enabled ? "block" : "none" }}><TouchableOpacity style={styles.button}><Text style={styles.text}>Create Meeting Token</Text></TouchableOpacity></div>
				</View>
		)
	};
	
	if (!editor) {
	return(
		 <View style={styles.container}>
        <div class="daily-call-element" style={{ display: videoCall.enabled ? "block" : "none", width: '100%', height: '100%', padding: 0}}> {JoinCall()} </div> 
							<div style={{display: createRoomButton.enabled ? "block" : "none" }}><TouchableOpacity style={styles.button} onPress={createRoomAction}><Text style={styles.text}>Create Room</Text></TouchableOpacity></div>	
							<div style={{display: deleteRoomButton.enabled ? "block" : "none" }}><TouchableOpacity style={styles.button} onPress={deleteRoomAction}><Text style={styles.text}>Delete Room</Text></TouchableOpacity></div>
							<div style={{display: updateRoomSettingsButton.enabled ? "block" : "none" }}><TouchableOpacity style={styles.button} onPress={updateRoomAction}><Text style={styles.text}>Update Room</Text></TouchableOpacity></div>
							<div style={{display: createMeetingTokenButton.enabled ? "block" : "none" }}><TouchableOpacity style={styles.button} onPress={meetingTokenAction}><Text style={styles.text}>Create Meeting Token</Text></TouchableOpacity></div>
		</View> 
	) }
};



const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	container: {
		width: '100%',
		height: '100%',
},
	button: {
			alignItems: 'center',
			justifyContent: 'center',
			paddingVertical: 12,
			paddingHorizontal: 32,
			marginVertical: 8,
			marginHorizontal: 16,
			borderRadius: 4,
			elevation: 3,
			backgroundColor: 'black',
	},
	text:{
			fontSize: 16,
			lineHeight: 21,
			fontWeight: 'bold',
			letterSpacing: 0.25,
			color: 'white',
	}
})

export default DailyVideoChat