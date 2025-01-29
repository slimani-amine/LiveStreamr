import React from "react";
import { useForm, RegisterOptions, UseFormRegister } from "react-hook-form";

interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    onLogin(data.email, data.password);
  };

  return (
    <div className="container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="login-form"
        id="loginform"
      >
        <FormHeader title="Login" />
        <Form register={register} errors={errors} />
        <OtherMethods />
      </form>
    </div>
  );
};

export default Login;

const FormHeader = ({ title }: { title: string }) => (
  <h2 id="headerTitle">{title}</h2>
);

interface FormProps {
  register: UseFormRegister<FormData>;
  errors: Record<string, any>;
}

const Form = ({ register, errors }: FormProps) => {
  const emailOptions: RegisterOptions<FormData, "email"> = {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    },
  };

  const passwordOptions: RegisterOptions<FormData, "password"> = {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
  };

  return (
    <div>
      <FormInput
        id="email"
        description="Email"
        placeholder="Enter your email"
        type="email"
        register={register}
        options={emailOptions}
        error={errors.email}
      />
      <FormInput
        id="password"
        description="Password"
        placeholder="Enter your password"
        type="password"
        register={register}
        options={passwordOptions}
        error={errors.password}
      />
      <FormButton title="Log in" />
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

const OtherMethods = () => (
  <div id="alternativeLogin">
    <button type="button" className="login-with-google-btn">
      Sign in with Google
    </button>
  </div>
);
