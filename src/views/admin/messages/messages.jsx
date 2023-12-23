import React from 'react';
import { Link } from 'react-router-dom';

import './messages.css';
import AdminSideBar from '../../../components/AdminSideBar';
import Helmet from 'react-helmet';

const Messages = (props) => {
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
		<div className="messages-container">
			<Helmet>
				<title>Messages - Lampara</title>
				<meta property="og:title" content="Account - Lampara" />
			</Helmet>
			<div className="messages-container01">
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
				<div className="messages-container02">
					<AdminSideBar />
				</div>
			</div>
			<div className="messages-container04">
				<svg viewBox="0 0 1024 1024" className="messages-icon13">
					<path d="M917.806 229.076c-22.212-30.292-53.174-65.7-87.178-99.704s-69.412-64.964-99.704-87.178c-51.574-37.82-76.592-42.194-90.924-42.194h-496c-44.112 0-80 35.888-80 80v864c0 44.112 35.888 80 80 80h736c44.112 0 80-35.888 80-80v-624c0-14.332-4.372-39.35-42.194-90.924zM785.374 174.626c30.7 30.7 54.8 58.398 72.58 81.374h-153.954v-153.946c22.984 17.78 50.678 41.878 81.374 72.572zM896 944c0 8.672-7.328 16-16 16h-736c-8.672 0-16-7.328-16-16v-864c0-8.672 7.328-16 16-16 0 0 495.956-0.002 496 0v224c0 17.672 14.326 32 32 32h224v624z"></path>
					<path d="M736 832h-448c-17.672 0-32-14.326-32-32s14.328-32 32-32h448c17.674 0 32 14.326 32 32s-14.326 32-32 32z"></path>
					<path d="M736 704h-448c-17.672 0-32-14.326-32-32s14.328-32 32-32h448c17.674 0 32 14.326 32 32s-14.326 32-32 32z"></path>
					<path d="M736 576h-448c-17.672 0-32-14.326-32-32s14.328-32 32-32h448c17.674 0 32 14.326 32 32s-14.326 32-32 32z"></path>
				</svg>
				<h1 className="messages-text2">Messages</h1>
				<div className="messages-container05">
					<div className="messages-container06">
						<div className="messages-container07">
							<h1 className="messages-text4">Nurse</h1>
							<h1 className="messages-text5">Diana Batigulao</h1>
						</div>
						<div className="messages-container08"></div>
						<input
							type="text"
							name="Password"
							required
							placeholder="   "
							className="messages-textinput input"
						/>
						<svg viewBox="0 0 1024 1024" className="messages-icon18">
							<path d="M992.262 871.396l-242.552-206.294c-25.074-22.566-51.89-32.926-73.552-31.926 57.256-67.068 91.842-154.078 91.842-249.176 0-212.078-171.922-384-384-384-212.076 0-384 171.922-384 384s171.922 384 384 384c95.098 0 182.108-34.586 249.176-91.844-1 21.662 9.36 48.478 31.926 73.552l206.294 242.552c35.322 39.246 93.022 42.554 128.22 7.356s31.892-92.898-7.354-128.22zM384 640c-141.384 0-256-114.616-256-256s114.616-256 256-256 256 114.616 256 256-114.614 256-256 256z"></path>
						</svg>
						<img
							alt="image"
							src="/LAMPARA/untitled%20(2%20%C3%A3%C2%97%202%20in)-200h.png"
							className="messages-image2"
						/>
					</div>
					<div className="messages-container09">
						<h1 className="messages-text6">
							Good morning, Ma&apos;am. I would like to request for a leave on
							Monday next week. Thank you.
						</h1>
						<h1 className="messages-text7">Admin</h1>
						<svg viewBox="0 0 1024 1024" className="messages-icon20">
							<path d="M992.262 871.396l-242.552-206.294c-25.074-22.566-51.89-32.926-73.552-31.926 57.256-67.068 91.842-154.078 91.842-249.176 0-212.078-171.922-384-384-384-212.076 0-384 171.922-384 384s171.922 384 384 384c95.098 0 182.108-34.586 249.176-91.844-1 21.662 9.36 48.478 31.926 73.552l206.294 242.552c35.322 39.246 93.022 42.554 128.22 7.356s31.892-92.898-7.354-128.22zM384 640c-141.384 0-256-114.616-256-256s114.616-256 256-256 256 114.616 256 256-114.614 256-256 256z"></path>
						</svg>
						<h1 className="messages-heading">Diana Batigulao</h1>
						<input
							type="text"
							placeholder="Write a message"
							className="messages-textinput1 input"
						/>
						<svg viewBox="0 0 1024 1024" className="messages-icon22">
							<path d="M86 896v-298l640-86-640-86v-298l896 384z"></path>
						</svg>
						<svg
							viewBox="0 0 1024 1024"
							className="messages-icon24"
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

export default Messages;
