import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function DesktopNavigation() {
  const token = useSelector((state) => state.token).token;

  return (
    <nav className="bg-orange-200 flex justify-between px-12 py-4">
      <ul className="flex gap-6">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
      </ul>
      <ul className="flex gap-6">
        {token ? (
          <li>
            <Link to="/login">Logout</Link>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default DesktopNavigation;
