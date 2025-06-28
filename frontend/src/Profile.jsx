import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.setItem("isLoggedIn", "false");
    navigate("/");
    window.location.reload(); // Optional: to re-render header if needed
  };
  const Home = () =>{
    navigate("/");
  }

  return (
    <>
      <h1>Profile</h1>
      <button onClick={Home}>Home</button>
      <button onClick={Logout}>Logout</button>
    </>
  );
}

export default Profile;
