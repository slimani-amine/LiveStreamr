# LiveStreamr

LiveStreamr is a video conferencing application built using React and LiveKit. It allows multiple users to join a video room, enabling real-time communication and collaboration.

## Features

- **User Authentication**: Users can log in using their email and password.
- **Join Video Rooms**: Users can enter a unique room ID to join a video conference.
- **Real-time Video and Audio Streaming**: Supports high-quality video and audio communication.
- **Participant List**: Displays a list of participants currently in the room.
- **Responsive Design**: The application is designed to work on various screen sizes, providing a seamless experience on both desktop and mobile devices.
- **Disconnect Handling**: Users can disconnect from the room and return to the join form.
- **Error Handling**: Provides feedback for login failures and token fetching issues.

## Technologies Used

- **React**: For building the user interface.
- **LiveKit**: For real-time video and audio streaming capabilities.
- **TypeScript**: For type safety and better development experience.
- **CSS**: For styling the application.
- **Fetch API**: For making HTTP requests to the backend.

## Installation

To run the LiveStreamr application locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/livestreamr.git
   cd livestreamr
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up the backend**:
   Ensure you have a backend server running that provides the authentication and token generation endpoints.:

4. **Run the application**:

   ```bash
   npm start
   ```

5. **Open your browser**:
   Navigate to `http://localhost:3000` to access the application.

## Usage

1. **Login**: Enter your email and password to log in.
2. **Join a Room**: After logging in, enter the room ID to join a video conference.
3. **Video Conferencing**: Once in the room, you can see and hear other participants. You can also share your video and audio.
4. **Participants List**: View the list of participants currently in the room.
5. **Disconnect**: You can disconnect from the room, which will return you to the join form.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [LiveKit](https://livekit.io/) for providing the real-time video and audio streaming capabilities.
- [React](https://reactjs.org/) for building the user interface.
