import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDragonsByAccount } from "../slices/accountDragons";
import AccountDragonRow from "./AccountDragonRow";

const AccountDragons = () => {
  const { dragons } = useSelector((state) => state.accountDragons);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDragonsByAccount());
  }, []);

  return (
    <div>
      <h3>Account Dragons</h3>
      {dragons.map((dragon) => (
        <div key={dragon.dragonId}>
          <AccountDragonRow dragon={dragon} />
          <hr />
        </div>
      ))}

      <Link to="/">Home</Link>
    </div>
  );
};

export default AccountDragons;
