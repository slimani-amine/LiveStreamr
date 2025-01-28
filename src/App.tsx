import React, { useState } from "react";
import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
} from "@livekit/components-react";

import "@livekit/components-styles";

import { Track } from "livekit-client";

const serverUrl = "wss://kotteb-v68xaust.livekit.cloud";

export default function App() {
  const [roomId, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5099/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          rememberMe: true,
        }),
      });
      if (response.ok) {
        const { data } = await response.json();
        setAuthToken(data.tokens.accessToken);
        setIsAuthenticated(true);
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleJoin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (roomId) {
      try {
        const response = await fetch(
          `http://localhost:5099/api/v1/room/getToken?roomId=${roomId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response.ok) {
          const { data } = await response.json();
          setToken(data);
          setJoined(true);
        } else {
          console.error("Error fetching token:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    }
  };

  const handleDisconnect = () => {
    setJoined(false);
    setRoomId("");
    setToken("");
  };

  return (
    <>
      {!isAuthenticated ? (
        <form onSubmit={handleLogin} style={{ padding: "20px" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      ) : !joined ? (
        <form onSubmit={handleJoin} style={{ padding: "20px" }}>
          <input
            type="text"
            placeholder="Enter room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            required
          />
          <button type="submit">Join</button>
        </form>
      ) : (
        <LiveKitRoom
          video={true}
          audio={true}
          token={token}
          serverUrl={serverUrl}
          data-lk-theme="default"
          style={{ height: "100vh" }}
          onDisconnected={handleDisconnect}
        >
          <MyVideoConference />
          <RoomAudioRenderer />
          <ControlBar />
        </LiveKitRoom>
      )}
    </>
  );
}

function MyVideoConference() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );
  return (
    <GridLayout
      tracks={tracks}
      style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
    >
      <ParticipantTile />
    </GridLayout>
  );
}
