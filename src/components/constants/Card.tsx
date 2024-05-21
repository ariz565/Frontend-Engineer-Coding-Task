import React from "react";
import { Link } from "react-router-dom";
import Button from "./Buttons";
import { useDispatch } from "react-redux";
import { removeContact } from "../../store";

const Card = ({ details }: any) => {
  const dispatch = useDispatch();

  return (
    <div className="lg:w-[300px] w-[250px] border border-grayLight p-5 rounded shadow-md ">
      {/* Display contact's name */}
      <p className="text-lg font-semibold text-primary">
        {details.firstName} {details.lastName}
      </p>

      {details.status === "Active" && (
        <p className="text-green-600 font-medium mt-2">Active</p>
      )}
      {details.status === "Inactive" && (
        <p className="text-red-600 font-medium mt-2">Inactive</p>
      )}
      <div className="flex items-center justify-between gap-5 mt-5">
        <Link to="/contacts/edit" state={details} className="w-full">
          <Button text="Edit" variant="edit" />
        </Link>

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
