import React from "react";
import { useForm, RegisterOptions, UseFormRegister } from "react-hook-form";

interface JoinRoomProps {
  onJoin: (roomId: string) => void;
}

interface FormData {
  roomId: string;
}

const JoinRoom: React.FC<JoinRoomProps> = ({ onJoin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    onJoin(data.roomId);
  };

  return (
    <div className="container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="login-form"
        id="loginform"
      >
        <FormHeader title="Join Room" />
        <Form register={register} errors={errors} />
      </form>
    </div>
  );
};

export default JoinRoom;

const FormHeader = ({ title }: { title: string }) => (
  <h2 id="headerTitle">{title}</h2>
);

interface FormProps {
  register: UseFormRegister<FormData>;
  errors: Record<string, any>;
}

const Form = ({ register, errors }: FormProps) => {
  const roomIdOptions: RegisterOptions<FormData, "roomId"> = {
    required: "Room ID is required",
  };

  return (
    <div>
      <FormInput
        id="roomId"
        description="Room ID"
        placeholder="Enter room ID"
        type="text"
        register={register}
        options={roomIdOptions}
        error={errors.roomId}
      />
      <FormButton title="Join" />
    </div>
  );
};

interface FormInputProps {
  id: keyof FormData;
  description: string;
  placeholder: string;
  type: string;
  register: UseFormRegister<FormData>;
  options: RegisterOptions<FormData>;
  error?: { message?: string };
}

const FormInput = ({
  id,
  description,
  placeholder,
  type,
  register,
  options,
  error,
}: FormInputProps) => (
  <div className="row">
    <label htmlFor={id}>{description}</label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      {...register(id, options)}
    />
    {error && <p className="error">{error.message}</p>}
  </div>
);

const FormButton = ({ title }: { title: string }) => (
  <div id="button" className="row">
    <button type="submit">{title}</button>
  </div>
);
