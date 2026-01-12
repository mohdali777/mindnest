import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { AppDispatch, RootState } from "../Redux/store";
import { verify } from "../Redux/Slices/Auth/reducers";

function Private() {
  const { is_verify } = useSelector((state: RootState) => state.Auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (is_verify === null) {
      dispatch(verify());
    }
  }, [is_verify, dispatch]);

  if (is_verify === null) {
    return <div>Checking authentication...</div>;
  }

  if (is_verify === true) {
    return <Outlet />;
  }

  return <Navigate to="/auth/login" replace />;
}

export default Private;
