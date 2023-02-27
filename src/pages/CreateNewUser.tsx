import React, { useState, useEffect, useContext } from "react";
// import { createUser, callApi } from "../api/user";
import { AppContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { createUserThunk, userStatus } from "../state/userSlice";
import {
    Form,
    Row,
    Col,
    Button,
    FormGroup,
    Input,
    Label,
    Card,
    FormFeedback
} from 'reactstrap'

function CreateNewUser() {
    const { navToWorkSpace } = useContext(AppContext);
    const dispatch = useDispatch()
    const status = useSelector(userStatus)
    const [isValid, setIsValid] = useState(false)
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    useEffect(() => {
        status === 'failed' && setIsValid(true)
        status === 'succeeded' && navToWorkSpace();
    }, [status]);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        dispatch(createUserThunk(user))
    }

    return (
        <Form className="new-user-form" onSubmit={handleSubmit}>
            <h3>Enter New User Details</h3>
            <Card style={{
                minHeight: '15em',
                width: '40em',
                padding: '1em',
            }}>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="exampleEmail">First Name</Label>
                            <Input
                                type="text"
                                placeholder="First Name"
                                onChange={(event) =>
                                    setUser({ ...user, firstName: event.target.value })
                                }
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="examplePassword">Last Name</Label>
                            <Input
                                // invalid
                                type="text"
                                placeholder="Last Name"
                                onChange={(event) =>
                                    setUser({ ...user, lastName: event.target.value })
                                }
                            />
                            <FormFeedback>
                                Oh noes! that name is already taken
                            </FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                    <Label for="exampleAddress">Email</Label>
                    <Input
                        invalid={isValid}
                        placeholder="Email"
                        onChange={(event) => setUser({ ...user, email: event.target.value })}
                        type="email"
                    />
                    <FormFeedback>
                        Email already used. Try again or log in with ID
                    </FormFeedback>
                </FormGroup>
                <Button
                    disabled={!(user.email !== '' && user.firstName !== '' && user.lastName !== '')}
                // disabled={true}
                >Sign in</Button>
            </Card>
        </Form>
    );
}

export default CreateNewUser;
