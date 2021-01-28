import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchDragonsByAccount } from "../slices/accountDragons";

const AccountDragons = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDragonsByAccount());
  }, []);

  return (
    <div>
      <h3>Account Dragons</h3>
    </div>
  );
};

export default AccountDragons;
