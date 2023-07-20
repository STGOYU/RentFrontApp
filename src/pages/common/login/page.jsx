import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess } from "../../../store";
import { useFormik } from "formik";
import { services } from "../../../services/";
import { utils } from "../../../utils";
import { CustomForm, PasswordInput } from "../../../components";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      // istegini endpointe gonder
      const data = await services.user.login(values);

      services.encryptedLocalStorage.setItem("token", data.token);
      // const responseUser = await services.user.getUser();
      // token ile kullanici bilgilerini al
      // kullanici bilgilerini merkezi state'e kaydet
      dispatch(loginSuccess());
      utils.functions.swalToast("You have successfully logged in", "success");
    } catch (error) {
      dispatch(loginFailure());
      utils.functions.swalToast(error.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: utils.initialValues.loginFormInitialValues,
    validationSchema: utils.validations.loginFormValidationSchema,
    onSubmit,
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      {/* <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type="text"
                    name="email"
                    placeholder="johndoe@example.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isValid={
                        formik.touched.email && !formik.errors.email
                    }
                    isInvalid={
                        formik.touched.email && formik.errors.email
                    }
                    disabled={true}
                />
                <Form.Control.Feedback type="invalid">
                    *{formik.errors.email}
                </Form.Control.Feedback>

                
            </Form.Group> */}
      {/* <CustomForm type="select" /> */}
      <CustomForm
        formik={formik}
        name="email"
        Label="Email Address"
        placeholder="jhondoe@example.com"
        type="email"
      />

      {/* PASSWORD INPUT */}
      <PasswordInput
        formik={formik}
        name="password"
        label="password"
        placeholder="Enter your password..."
      />

      {/* CUSTOM FORM */}

      <Button>LOGIN</Button>
      <p>OR</p>
      <Button>REGISTER</Button>
    </Form>
  );
};

export default LoginPage;
