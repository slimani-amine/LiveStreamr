import React, { useState } from "react";

interface JoinRoomProps {
  onJoin: (roomId: string) => void;
}

const JoinRoom: React.FC<JoinRoomProps> = ({ onJoin }) => {
  const [roomId, setRoomId] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onJoin(roomId);
  };

  return (
    <form onSubmit={handleSubmit} className="join-room-form">
      <h2>Join Room</h2>
      <input
        type="text"
        placeholder="Enter room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        required
      />
      <button type="submit">Join</button>
    </form>
  );
};

export default JoinRoom;
