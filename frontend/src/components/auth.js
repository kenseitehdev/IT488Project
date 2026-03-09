import '../Vistera/VistraJS.js'
import store from '../store.js'

let auth = $.component.define({
  name: "auth-modal",
  props: [],
  template: `
<div id="auth-modal">
  <div class="container" id="container">
    <div class="form-container sign-up-container">
      <form id="registerForm">
        <h1>Create Account</h1>
        <input id="registerName" type="text" placeholder="Name" />
        <input id="registerEmail" type="email" placeholder="Email" />
        <input id="registerPassword" type="password" placeholder="Password" />
        <button id="signupBtn" type="submit">Sign Up</button>
      </form>
    </div>

    <div class="form-container sign-in-container">
      <form id="loginForm">
        <h1 class="mb-4">Sign in</h1>
        <input id="loginEmail" type="email" placeholder="Email" />
        <input id="loginPassword" type="password" placeholder="Password" />
        <a href="#">Forgot your password?</a>
        <button id="signinBtn" type="submit">Sign In</button>
      </form>
    </div>

    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Welcome Back to Homestack!</h1>
          <button class="ghost" id="signIn" type="button">Sign In</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>Welcome to Homestack!</h1>
          <button class="ghost -mb-20" id="signUp" type="button">Sign Up</button>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
  onMount() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });

    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const name = document.getElementById('registerName').value.trim();
      const email = document.getElementById('registerEmail').value.trim();
      const password = document.getElementById('registerPassword').value.trim();

      try {
        const res = await fetch("http://127.0.0.1:5000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            password
          })
        });

        const data = await res.json();
        console.log("register response:", data);

        if (!res.ok) {
          alert(data.error || "Registration failed");
          return;
        }

store.state.token = data.token;
store.state.user = data.user;

localStorage.setItem("token", data.token);
localStorage.setItem("user", JSON.stringify(data.user));
        // Hide modal after successful auth
        document.getElementById("auth-modal").classList.toggle("hidden");
                window.location.reload();
      } catch (err) {
        console.error("register error:", err);
        alert("Registration request failed");
      }
    });

    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value.trim();

      try {
        const res = await fetch("http://127.0.0.1:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        });

        const data = await res.json();
        console.log("login response:", data);

        if (!res.ok) {
          alert(data.error || "Login failed");
          return;
        }

store.state.token = data.token;
store.state.user = data.user;

localStorage.setItem("token", data.token);
localStorage.setItem("user", JSON.stringify(data.user));
        document.getElementById("auth-modal").classList.add("hidden");
        window.location.reload();
      } catch (err) {
        console.error("login error:", err);
        alert("Login request failed");
      }
    });

    const user = store.state.user;
    const username = user ? (user.email || user.name || "Guest") : "Guest";
    console.log("current user:", username);

    if (user) {
      document.getElementById("auth-modal").classList.add("hidden");
      
    }
  }
});

export default auth;