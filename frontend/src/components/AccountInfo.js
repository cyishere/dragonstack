import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountInfo } from "../slices/accountInfoSlice";

const AccountInfo = () => {
  console.log(
    "accountInfo",
    useSelector((state) => state.accountInfo)
  );
  const { username, balance } = useSelector((state) => state.accountInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAccountInfo());
  }, []);

  return (
    <div>
      <h3>Account Info</h3>
      <p>Username: {username}</p>
      <p>Balance: {balance}</p>
    </div>
  );
};

export default AccountInfo;
