import './index.css';
import { useNavigate } from 'react-router-dom';
import loginlogo from './Images/Login.png';

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
    alert("Login Successfully");
  };

  return (
    <div className="lg">
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <img className="loginlogo" src={loginlogo} alt="Login Logo" />
        </div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <div className="link">
          <a href="#">Forgot Password?</a>
        </div>
        <button className="l" type="submit">
          Login
        </button>
        <div className="sg">
          <section className="create">Create an Account -</section>
          <section className="si">
            <a href="/singin">Sign in</a>
          </section>
        </div>
      </form>
    </div>
  );
}

export default Login;
