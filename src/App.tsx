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
import Login from "./Login";
import JoinRoom from "./JoinRoom";

// Use environment variables for configuration
const serverUrl =
  import.meta.env.VITE_LIVEKIT_SERVER_URL || "wss://default-url.livekit.cloud";

export default function App() {
  const [joined, setJoined] = useState(false);
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState("");

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            rememberMe: true,
          }),
        }
      );
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

  const handleJoin = async (roomId: string) => {
    if (roomId) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/room/getToken?roomId=${roomId}`,
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
    setToken("");
  };

  return (
    <>
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : !joined ? (
        <JoinRoom onJoin={handleJoin} />
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
