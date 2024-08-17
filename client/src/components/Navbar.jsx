import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cookies, useCookies } from "react-cookie";


export const Navbar = () => {

 const [cookies, setCookies] = useCookies(["access_token"]);
 const navigate = useNavigate();

 const logout = () => {
   setCookies("access_token", "");
   window.localStorage.clear();
   navigate("/auth");
 };

  return (
    <div className="text-xl bg-black text-white p-7">
      

<Link to="/" className="mr-4">Home </Link>
<Link to="/create-recipes" className="mr-4">Create Recipes </Link>
<Link to="/saved-recipes" className="mr-4">Saved Recipes </Link>

{!cookies.access_token ? ( 
<Link to="/auth"> Login/Register </Link>

) : (
<button onClick={logout} className="bg-white text-black py-2 px-4 rounded hover:bg-blue-700" > Logout </button>

 )}

    </div>
  );
};
