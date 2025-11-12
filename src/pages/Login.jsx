import { useRef } from "react";
import { Button, Form } from "react-bootstrap";

import { verifyUser } from "../data/users";
import "./Login.css";

function Login({ setToken, setRole }) {
    const userRef = useRef()
    const passRef = useRef()

    return (
        <div className="login-container">
            <div className="p-3">
                <Form.Label htmlFor="username">USER :</Form.Label>
                <Form.Control
                    type="text"
                    id="username"
                    title="type : user"
                    placeholder='user'
                    style={{ textAlign: 'center', background: 'rgba(156, 156, 156, 1)' }}
                    ref={userRef}
                />
                <Form.Label htmlFor="password">PASS :</Form.Label>
                <Form.Control
                    type="password"
                    id="password"
                    title="type : pass"
                    placeholder='pass'
                    style={{ textAlign: 'center', background: 'rgba(156, 156, 156, 1)' }}
                    ref={passRef}
                />
                <Button
                    variant="success mt-3"
                    onClick={() => {
                        const user = userRef.current.value.trim()
                        const pass = passRef.current.value.trim()
                        userRef.current.value = ''
                        passRef.current.value = ''
                        const userInfo = verifyUser(user, pass)

                        if (userInfo === null) {
                            alert('Wrong Username or Password')
                            userRef.current.focus()
                        } else {
                            setToken(userInfo.token)
                            setRole(userInfo.role)
                        }

                    }}
                >
                    Login
                </Button>
            </div>
        </div>
    );
}

export default Login;