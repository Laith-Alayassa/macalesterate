import React from "react";

function SignInScreen(props) {
  const handleSignIn = props.handleSignIn;
  return (
    <div style={style.loginContainer}>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js"></script>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css"
      ></link>
      <div className="col s12 m6 offset-m3 center-align">
        <button
          style={{ backgroundColor: "white", borderWidth: 0 }}
          onClick={handleSignIn}
        >
          <a
            className="oauth-container btn darken-4 white black-text"
            style={{ textTransform: "none" }}
          >
            <div className="left">
              <img
                width="20px"
                style={style.logo}
                alt="Google sign-in"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              />
            </div>
            Login with Google
          </a>
        </button>
      </div>
    </div>
  );
}

const style = {
  loginContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  logo: { marginTop: 7, marginRight: 8 },
};
export default SignInScreen;
