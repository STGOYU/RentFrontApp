import { useState } from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { utils } from "../../../utils";

const PasswordInput = (props) => {
  //formik, label, name, disabled, placeholder

  const [type, setType] = useState("password");

  const tooglePassword = () => {
    const newType = type === "password" ? "text" : "password";
    setType(newType);
  };

  const properties = {
    type,
    disabled: props.disabled,
    placeholder: props.placeholder,
    ...props.formik.getFieldProps(props.name),
    ...utils.functions.validCheck(props.name, props.formik),
  };

  return (
    <Form.Group
            className="mb-3"
            title={type === "password" ? "Show Password" : "Hide Password"}>
      <Form.Label>{props.label}</Form.Label>

      <InputGroup>
        <FormControl {...properties} />
        <InputGroup.Text 
           onClick={tooglePassword}
           style={{cursor: "pointer"}}
           >
          {type === "password" ? (
            <MdOutlineVisibility />
          ) : (
            <MdOutlineVisibilityOff />
          )}
        </InputGroup.Text>
        <Form.Control.Feedback>
          {props.formik.errors[props.name]}
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
};

export default PasswordInput;
