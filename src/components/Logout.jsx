import { logout } from "@redux/auth";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    try {
      dispatch(logout());
    } finally {
      navigate("/", { replace: true });
    }
  }, [dispatch, navigate]);
  return <React.Fragment />;
};

export default Logout;
