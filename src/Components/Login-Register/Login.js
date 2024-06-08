import $ from 'jquery';
import React, { useEffect } from 'react';
import './Login.css'
const Login = () => {
    useEffect(() => {
        $(document).ready(function () {
            $(".reg").click(function () {
                $(".main_container1").slideUp(3000);
                $(".main_container2").css("visibility", "visible");
                $(".main_container2").slideDown(4000);
            });
        });
    }, []);
    return (
        <body>
            <div class="main_container1">
                <div class="Login_form">
                    <form action="Login.php" method="post">
                        <h2>Sign in</h2>
                        <input
                            placeholder="   Email adress or phone number"
                            type="text"
                            id="username"
                            name="Email"
                            class="inputs"
                            required
                            autofocus
                        />
                        <br />
                        <input
                            placeholder="   Password"
                            type="Password"
                            id="Password"
                            class="inputs"
                            required
                            name="Password"
                        />
                        <br />
                        <button class="lgn-btn" type="submit">Log in</button>
                    </form>
                    <br />
                    <div class="register">
                        <p>
                            You don't have account?<span class="reg">Create new account</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="main_container2">
                <div class="signup_form">
                    <form action="Signup.php" method="post">
                        <p>Create a new account</p>
                        <input
                            type="text"
                            placeholder="   First name"
                            id="fname"
                            required
                            name="fName"
                        />
                        <input
                            type="text"
                            placeholder="   Last name"
                            id="lname"
                            name="lName"
                            required
                        /><br />
                        <input
                            type="number"
                            placeholder="   phone number"
                            id="num"
                            class="box"
                            name="number"
                            required
                        /><br />
                        <input
                            type="email"
                            placeholder="   Email Address"
                            id="email"
                            class="box"
                            name="Email"
                            required
                        /><br />
                        <input
                            type="Password"
                            placeholder="   Password"
                            id="pass"
                            class="box"
                            required
                            name="Password"
                        /><br />
                        <input
                            type="Password"
                            placeholder="   Confirm Password"
                            id="con_pass"
                            required
                            class="box"
                            name="conf_Password"
                        /><br />
                        <label for="brth">Date of birth</label><br />
                        <input type="date" name="birthdate" id="brth" />
                        <br />
                        <label for="gndrM">Male</label>
                        <input type="radio" id="gndrM" name="gender" value="Male" />
                        <label for="gndrF">Female</label>
                        <input type="radio" id="gndrF" name="gender" value="Female" />
                        <br />
                        <button class="reg-btn" type="submit" onclick="Validate()">
                            Sign up
                        </button>
                    </form>
                </div>
            </div>
            <script src="Validate.js"></script>
        </body>);
};

export default Login;