import React from "react";
import { Link } from "react-router-dom";
import Button from "./Buttons";
import { useDispatch } from "react-redux";
import { removeContact } from "../store";

const Card = ({ details }: any) => {
  const dispatch = useDispatch();

  return (
    <div className="lg:w-[300px] w-[250px] border border-gray-300 p-5 rounded shadow-md">
      {/* Display contact's name */}
      <p className="text-lg font-semibold text-primary">
        {details.firstName} {details.lastName}
      </p>
      {/* Display status in green if active, red if inactive */}
      {details.status === "Active" && (
        <p className="text-green-600 font-medium mt-2">Active</p>
      )}
      {details.status === "Inactive" && (
        <p className="text-red-600 font-medium mt-2">Inactive</p>
      )}
      <div className="flex items-center justify-between gap-5 mt-5">
        {/* Link to edit contact page with contact details as state */}
        <Link to="/contacts/edit" state={details} className="w-full">
          <Button text="Edit" variant="edit" />
        </Link>
        {/* Button to remove contact */}
        <Button
          onClick={() => {
            dispatch(removeContact(details?.id));
          }}
          text="Delete"
          variant="delete"
        />
      </div>
    </div>
  );
};

export default Card;
