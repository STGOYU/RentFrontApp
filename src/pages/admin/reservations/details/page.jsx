import { useEffect, useState } from "react";
import { constants } from "../../../../constants";
import { Form, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { utils } from "../../../../utils";
import { services } from "../../../../services";
import { CustomForm, Loading } from "../../../../components";
import { Alert, Button, ButtonGroup, Row, Spinner } from "react-bootstrap";

const { routes } = constants;

const AdminReservationDetailsPage = () => {
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [saving, setSaving] = useState(false);
    const [vehicles, setVehicles] = useState([]);
    const { reservationId } = useParams();
    const navigate = useNavigate();

    const vehiclesOptions = vehicles.map((vehicle) => ({
        id: vehicle?.id,
        value: vehicle?.id,
        name: vehicle?.model,
    }));

    const formItems = [
        {
            name: "pickUpLocation",
            label: "Pick Up Location",
        },
        {
            name: "dropOffLocation",
            label: "Drop Off Location",
        },
        {
            name: "pickUpDate",
            label: "Pick Up Date",
            type: "date",
        },
        {
            name: "pickUpTime",
            label: "Pick Up Time",
            type: "time",
        },
        {
            name: "dropOffDate",
            label: "Drop Off Date",
            type: "date",
        },
        {
            name: "dropOffTime",
            label: "Drop Off Time",
            type: "time",
        },
        {
            name: "carId",
            label: "Vehicle",
            type: "select",
            itemsArr: vehiclesOptions,
        },
        {
            name: "status",
            label: "Status",
            type: "select",
            itemsArr: constants.reservationStatus,
        },
    ];

    const [initialValues, setInitialValues] = useState({
        pickUpLocation: "",
        dropOffLocation: "",
        pickUpDate: "",
        pickUpTime: "",
        dropOffDate: "",
        dropOffTime: "",
        carId: "",
        status: "",
        userId: "",
    });

    const onSubmit = async (values) => {
        setSaving(true);
        if (!values.password) delete values.password;
        const dto = {
            ...values,
            builtIn: false, // bazi verilerin silinmesini onlemek amaciyla
        };

        try {
            await services.user.updateUserAdmin(userId, dto);
            utils.functions.swalToast("User updated successfully.", "success");
        } catch (error) {
            utils.functions.swalToast(
                "There was an error updating the user.",
                "error"
            );
        } finally {
            setUpdating(false);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema:
            utils.validations.adminReservationDetailsFormValidationSchema,
        onSubmit,
        enableReinitialize: true,
    });

    const removeReservation = async () => {
        setDeleting(true);
        try {
            await services.reservation.deleteReservation(reservationId);
            utils.functions.swalToast(
                "Reservation deleted successfully.",
                "success"
            );
            navigate(`${routes.adminUsers}`);
        } catch (error) {
            utils.functions.swalToast(
                "There was an error deleting the reservation.",
                "error"
            );
        } finally {
            setDeleting(false);
        }
    };

    const handleDelete = async () => {
        utils.functions
            .swalQuestion(
                "Are you sure you want to delete this reservation?",
                "You won't be able to revert this action!"
            )
            .then((result) => {
                if (result.isConfirmed) {
                    removeReservation();
                }
            });
    };

    const loadData = async () => {
        try {
            const reservationsData =
                await services.reservation.getReservationByIdAdmin(
                    reservationId
                );
            const vehiclesData = await services.vehicle.getVehicles();

            const dto = {
                ...reservationsData,
                pickUpDate: utils.functions.getDate(
                    reservationsData.pickUpDate
                ),
                pickUpTime: utils.functions.getTime(
                    reservationsData.pickUpTime
                ),
                dropOffDate: utils.functions.getDate(
                    reservationsData.dropOffDate
                ),
                dropOffTime: utils.functions.getTime(
                    reservationsData.dropOffTime
                ),
            };

            setInitialValues(dto);
            setVehicles(vehiclesData);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return loading ? (
        <Loading height={500} />
    ) : (
        <Form
            noValidate
            onSubmit={formik.handleSubmit}
            className="admin-user-details-form mt-5">
            <fieldset disabled={formik.values.builtIn}>
                <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3">
                    {formItems.map((item) => (
                        <CustomForm key={item.name} formik={formik} {...item} />
                    ))}
                </Row>
                <Form.Check
                    label="Customer"
                    value="Customer"
                    type="checkbox"
                    name="roles"
                    checked={formik.values.roles.includes("Customer")}
                    onChange={() => handleChangeRoles("Customer")}
                />
                <Form.Check
                    label="Admin"
                    value="Administrator"
                    type="checkbox"
                    name="roles"
                    checked={formik.values.roles.includes("Administrator")}
                    onChange={() => handleChangeRoles("Administrator")}
                />
            </fieldset>
            {formik.values.builtIn && (
                <Alert variant="warning">
                    Built-in accounts cannot be deleted or updated.
                </Alert>
            )}
            <div className="text-end">
                <ButtonGroup>
                    <Button onClick={() => navigate(-1)}>Cancel</Button>
                    {!formik.values.builtIn && (
                        <>
                            <Button
                                type="submit"
                                disabled={
                                    !(formik.dirty && formik.isValid) ||
                                    saving
                                }>
                                {saving && (
                                    <Spinner animation="border" size="sm" />
                                )}{" "}
                                Save
                            </Button>
                            <Button
                                variant="danger"
                                onClick={handleDelete}
                                disabled={deleting}>
                                {deleting && (
                                    <Spinner animation="border" size="sm" />
                                )}{" "}
                                Delete
                            </Button>
                        </>
                    )}
                </ButtonGroup>
            </div>
        </Form>
    );
};

export default AdminReservationDetailsPage;