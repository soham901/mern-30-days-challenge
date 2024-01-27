/* eslint-disable react/prop-types */
import { Form, useForm } from "react-hook-form";

export default function App() {
  const {
    register,
    control,
    formState: { errors },
    reset,
  } = useForm();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <h1 style={{ fontSize: "36px", fontWeight: "bold" }}>
        Day 7: Form Handling and Validation
      </h1>
      <div
        style={{
          backgroundColor: "#0f0f0f",
          border: "1px solid black",
          padding: "1rem",
          borderRadius: "1rem",
          width: "24rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <h2 style={{ color: "white", margin: "0" }}>
          Contact Form using{" "}
          <span style={{ opacity: ".5", fontSize: "1rem" }}>
            React Hook Form
          </span>
        </h2>

        <Form
          action="http://localhost:3000/contact-us"
          encType={"application/json"}
          onError={async (errors) => {
            const payload = await errors.response.json();
            alert(payload.message);
          }}
          onSuccess={async (data) => {
            const payload = await data.response.json();
            alert(payload.message);
            // reset the form
            reset();
          }}
          control={control}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Input
            name="fullname"
            label="Full Name"
            register={register}
            required
            minLength={3}
            maxLength={20}
            pattern={/^[a-zA-Z- ]+$/}
            patternErrMsg="Full name must contain only letters"
            errors={errors.fullname}
          />

          <Input
            type="textarea"
            name="message"
            label="Message"
            register={register}
            minLength={8}
            maxLength={100}
            required
            errors={errors.message}
          />

          <Input
            name="email"
            label="Email"
            register={register}
            required
            pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
            patternErrMsg="Email must contain only letters"
            errors={errors.email}
          />

          <Input name="submit" type="submit" errors={errors} />
        </Form>
      </div>
    </div>
  );
}

function Input({
  type = "text",
  name,
  register,
  label,
  required,
  errors,
  pattern,
  patternErrMsg,
  minLength,
  maxLength,
}) {
  const errorMsg = () => {
    if (errors?.type === "required") {
      return `${name} is required`;
    }
    if (errors?.type === "maxLength") {
      return `${name} cannot exceed ${maxLength} characters`;
    }
    if (errors?.type === "minLength") {
      return `${name} must have at least ${minLength} characters`;
    }
    if (errors?.type === "pattern") {
      return patternErrMsg;
    }
    if (errors?.type) {
      return `${name} is invalid`;
    }
  };

  if (type === "submit") {
    const formIsValid = Object.keys(errors).length === 0;

    return (
      <input
        type={type}
        style={{
          backgroundColor: formIsValid ? "green" : "red",
          cursor: formIsValid ? "pointer" : "not-allowed",
          color: "white",
          padding: ".5rem",
          borderRadius: "1rem",
          border: "none",
        }}
        disabled={!formIsValid}
      />
    );
  }

  if (type === "textarea") {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor={name}>{label}</label>
        <textarea
          type={type}
          placeholder={label}
          {...register(name, {
            required,
            pattern,
            minLength,
            maxLength,
          })}
          style={{
            minHeight: "5rem",
            padding: ".5rem",
            borderRadius: "1rem",
            border: "none",
            resize: "vertical",
          }}
        />

        {errors && (
          <span style={{ color: "red", marginLeft: ".5rem" }}>
            {errorMsg()}
          </span>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        placeholder={label}
        {...register(name, {
          required,
          pattern,
          minLength,
          maxLength,
        })}
        style={{
          padding: ".5rem",
          borderRadius: "1rem",
          border: "none",
        }}
      />

      {errors && (
        <span style={{ color: "red", marginLeft: ".5rem" }}>{errorMsg()}</span>
      )}
    </div>
  );
}
