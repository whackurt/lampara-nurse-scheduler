import React from 'react';
import { Link } from 'react-router-dom';

import './messages-nurses.css';
import NurseSideBar from '../../../components/SideBar/NurseSideBar';

const MessagesNurses = (props) => {
	// State to control the visibility of the file upload pop-up
	const [isFileUploadVisible, setFileUploadVisible] = React.useState(false);

	// Function to toggle the visibility of the file upload pop-up
	const toggleFileUpload = () => {
		setFileUploadVisible(!isFileUploadVisible);
	};

	// Function to handle file upload
	const handleFileUpload = (event) => {
		const selectedFile = event.target.files[0];
		// Process the selected file as needed
		console.log('Selected file:', selectedFile);
		// Additional logic for handling the file goes here
	};

	return (
		<div className="messages-nurses-container">
			<div className="messages-nurses-container01">
				{/* File Upload Pop-up */}
				{isFileUploadVisible && (
					<div className="file-upload-popup">
						<div className="close-button" onClick={toggleFileUpload}>
							<svg viewBox="0 0 24 24" className="close-icon">
								<path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z"></path>
							</svg>
						</div>
						<input type="file" onChange={handleFileUpload} />
						<button className="upload-button" onClick={handleFileUpload}>
							Upload
						</button>
					</div>
				)}
				<div className="messages-nurses-container02">
					<div className="messages-nurses-container03">
						<h1 className="messages-nurses-text">Nurse</h1>
						<svg viewBox="0 0 1024 1024" className="messages-nurses-icon">
							<path d="M1024 590.444l-512-397.426-512 397.428v-162.038l512-397.426 512 397.428zM896 576v384h-256v-256h-256v256h-256v-384l384-288z"></path>
						</svg>
						<svg viewBox="0 0 1024 1024" className="messages-nurses-icon02">
							<path d="M917.806 229.076c-22.212-30.292-53.174-65.7-87.178-99.704s-69.412-64.964-99.704-87.178c-51.574-37.82-76.592-42.194-90.924-42.194h-496c-44.112 0-80 35.888-80 80v864c0 44.112 35.888 80 80 80h736c44.112 0 80-35.888 80-80v-624c0-14.332-4.372-39.35-42.194-90.924zM785.374 174.626c30.7 30.7 54.8 58.398 72.58 81.374h-153.954v-153.946c22.984 17.78 50.678 41.878 81.374 72.572zM896 944c0 8.672-7.328 16-16 16h-736c-8.672 0-16-7.328-16-16v-864c0-8.672 7.328-16 16-16 0 0 495.956-0.002 496 0v224c0 17.672 14.326 32 32 32h224v624z"></path>
							<path d="M736 832h-448c-17.672 0-32-14.326-32-32s14.328-32 32-32h448c17.674 0 32 14.326 32 32s-14.326 32-32 32z"></path>
							<path d="M736 704h-448c-17.672 0-32-14.326-32-32s14.328-32 32-32h448c17.674 0 32 14.326 32 32s-14.326 32-32 32z"></path>
							<path d="M736 576h-448c-17.672 0-32-14.326-32-32s14.328-32 32-32h448c17.674 0 32 14.326 32 32s-14.326 32-32 32z"></path>
						</svg>
						<svg viewBox="0 0 1024 1024" className="messages-nurses-icon11">
							<path d="M512 662q62 0 106-44t44-106-44-106-106-44-106 44-44 106 44 106 106 44zM830 554l90 70q14 10 4 28l-86 148q-8 14-26 8l-106-42q-42 30-72 42l-16 112q-4 18-20 18h-172q-16 0-20-18l-16-112q-38-16-72-42l-106 42q-18 6-26-8l-86-148q-10-18 4-28l90-70q-2-14-2-42t2-42l-90-70q-14-10-4-28l86-148q8-14 26-8l106 42q42-30 72-42l16-112q4-18 20-18h172q16 0 20 18l16 112q38 16 72 42l106-42q18-6 26 8l86 148q10 18-4 28l-90 70q2 14 2 42t-2 42z"></path>
						</svg>
						<NurseSideBar />
						<svg viewBox="0 0 1024 1024" className="messages-nurses-icon25">
							<path d="M768 640v-128h-320v-128h320v-128l192 192zM704 576v256h-320v192l-384-192v-832h704v320h-64v-256h-512l256 128v576h256v-192z"></path>
						</svg>
					</div>
				</div>
			</div>
			<div className="messages-nurses-container04">
				<svg viewBox="0 0 1024 1024" className="messages-nurses-icon13">
					<path d="M917.806 229.076c-22.212-30.292-53.174-65.7-87.178-99.704s-69.412-64.964-99.704-87.178c-51.574-37.82-76.592-42.194-90.924-42.194h-496c-44.112 0-80 35.888-80 80v864c0 44.112 35.888 80 80 80h736c44.112 0 80-35.888 80-80v-624c0-14.332-4.372-39.35-42.194-90.924zM785.374 174.626c30.7 30.7 54.8 58.398 72.58 81.374h-153.954v-153.946c22.984 17.78 50.678 41.878 81.374 72.572zM896 944c0 8.672-7.328 16-16 16h-736c-8.672 0-16-7.328-16-16v-864c0-8.672 7.328-16 16-16 0 0 495.956-0.002 496 0v224c0 17.672 14.326 32 32 32h224v624z"></path>
					<path d="M736 832h-448c-17.672 0-32-14.326-32-32s14.328-32 32-32h448c17.674 0 32 14.326 32 32s-14.326 32-32 32z"></path>
					<path d="M736 704h-448c-17.672 0-32-14.326-32-32s14.328-32 32-32h448c17.674 0 32 14.326 32 32s-14.326 32-32 32z"></path>
					<path d="M736 576h-448c-17.672 0-32-14.326-32-32s14.328-32 32-32h448c17.674 0 32 14.326 32 32s-14.326 32-32 32z"></path>
				</svg>
				<img
					alt="image"
					src="/LAMPARA/338316809_1456186771578578_5155093782169563773_n-200h.jpg"
					className="messages-nurses-image1"
				/>
				<h1 className="messages-nurses-text2">Messages</h1>
				<h1 className="messages-nurses-text3">Jabez Joshua</h1>
				<div className="messages-nurses-container05">
					<div className="messages-nurses-container06">
						<div className="messages-nurses-container07">
							<h1 className="messages-nurses-text4">Admin</h1>
							<h1 className="messages-nurses-text5">Diana Batigulao</h1>
						</div>
						<div className="messages-nurses-container08"></div>
						<input
							type="text"
							name="Password"
							required
							placeholder="   "
							className="messages-nurses-textinput input"
						/>
						<svg viewBox="0 0 1024 1024" className="messages-nurses-icon18">
							<path d="M992.262 871.396l-242.552-206.294c-25.074-22.566-51.89-32.926-73.552-31.926 57.256-67.068 91.842-154.078 91.842-249.176 0-212.078-171.922-384-384-384-212.076 0-384 171.922-384 384s171.922 384 384 384c95.098 0 182.108-34.586 249.176-91.844-1 21.662 9.36 48.478 31.926 73.552l206.294 242.552c35.322 39.246 93.022 42.554 128.22 7.356s31.892-92.898-7.354-128.22zM384 640c-141.384 0-256-114.616-256-256s114.616-256 256-256 256 114.616 256 256-114.614 256-256 256z"></path>
						</svg>
						<img
							alt="image"
							src="/LAMPARA/untitled%20(2%20%C3%A3%C2%97%202%20in)-200h.png"
							className="messages-nurses-image2"
						/>
					</div>
					<div className="messages-nurses-container09">
						<h1 className="messages-nurses-text6">
							Good morning, Ma&apos;am. I would like to request for a leave on
							Monday next week. Thank you.
						</h1>
						<h1 className="messages-nurses-text7">Admin</h1>
						<svg viewBox="0 0 1024 1024" className="messages-nurses-icon20">
							<path d="M992.262 871.396l-242.552-206.294c-25.074-22.566-51.89-32.926-73.552-31.926 57.256-67.068 91.842-154.078 91.842-249.176 0-212.078-171.922-384-384-384-212.076 0-384 171.922-384 384s171.922 384 384 384c95.098 0 182.108-34.586 249.176-91.844-1 21.662 9.36 48.478 31.926 73.552l206.294 242.552c35.322 39.246 93.022 42.554 128.22 7.356s31.892-92.898-7.354-128.22zM384 640c-141.384 0-256-114.616-256-256s114.616-256 256-256 256 114.616 256 256-114.614 256-256 256z"></path>
						</svg>
						<h1 className="messages-nurses-heading">Diana Batigulao</h1>
						<input
							type="text"
							placeholder="Write a message"
							className="messages-nurses-textinput1 input"
						/>
						<svg viewBox="0 0 1024 1024" className="messages-nurses-icon22">
							<path d="M86 896v-298l640-86-640-86v-298l896 384z"></path>
						</svg>
						<svg
							viewBox="0 0 1024 1024"
							className="messages-nurses-icon24"
							onClick={toggleFileUpload}
						>
							<path d="M665.832 327.048l-64.952-64.922-324.81 324.742c-53.814 53.792-53.814 141.048 0 194.844 53.804 53.792 141.060 53.792 194.874 0l389.772-389.708c89.714-89.662 89.714-235.062 0-324.726-89.666-89.704-235.112-89.704-324.782 0l-409.23 409.178c-0.29 0.304-0.612 0.576-0.876 0.846-125.102 125.096-125.102 327.856 0 452.906 125.054 125.056 327.868 125.056 452.988 0 0.274-0.274 0.516-0.568 0.82-0.876l0.032 0.034 279.332-279.292-64.986-64.92-279.33 279.262c-0.296 0.268-0.564 0.57-0.846 0.844-89.074 89.058-233.98 89.058-323.076 0-89.062-89.042-89.062-233.922 0-322.978 0.304-0.304 0.604-0.582 0.888-0.846l-0.046-0.060 409.28-409.166c53.712-53.738 141.144-53.738 194.886 0 53.712 53.734 53.712 141.148 0 194.84l-389.772 389.7c-17.936 17.922-47.054 17.922-64.972 0-17.894-17.886-17.894-47.032 0-64.92l324.806-324.782z"></path>
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MessagesNurses;
