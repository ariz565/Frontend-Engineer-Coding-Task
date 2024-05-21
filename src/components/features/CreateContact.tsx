import React, { useEffect, useState } from "react";
import Sidebar from "../constants/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addContact, updateContact } from "../store";
import { nanoid } from "nanoid";

// Radio button options for contact status
const radioItems = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
];

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  status: string;
}

const CreateContact = ({ edit }: any) => {
  // Get location state and dispatch from hooks
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Initial state for form inputs
  const initialStates = {
    firstName: "",
    lastName: "",
    status: "",
  };

  // State for form parameters
  const [params, setParams] = useState(initialStates);

  // Set form parameters if in edit mode
  useEffect(() => {
    if (state) {
      setParams({
        firstName: state.firstName || "",
        lastName: state.lastName || "",
        status: state.status || "",
      });
    }
  }, [state]);

  // Handle input change for text inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams({ ...params, [name]: value });
  };

  // Handle radio button change for status
  const handleRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams({ ...params, status: e.target.value });
  };

  // Handle form submission for creating a new contact
  const handleSubmit = () => {
    const newContact: Contact = { ...params, id: nanoid() };
    dispatch(addContact(newContact)); // Dispatch action to add contact
    navigate("/contacts"); // Navigate to contacts page
  };

  // Handle form submission for updating an existing contact
  const handleUpdate = () => {
    const updatedContact: Contact = { ...params, id: state.id };
    dispatch(updateContact(updatedContact)); // Dispatch action to update contact
    navigate("/contacts"); // Navigate to contacts page
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <div className="w-full lg:w-[1190px] mt-20 px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
            {edit ? "Edit Contact" : "Create Contact"}
          </h2>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
              id="firstName"
              type="text"
              placeholder="Alix"
              value={params.firstName}
              name="firstName"
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
              id="lastName"
              type="text"
              placeholder="Coe"
              value={params.lastName}
              name="lastName"
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Status</label>
            <div className="flex items-center">
              {radioItems.map((item, index) => (
                <div key={index} className="flex items-center mr-4">
                  <input
                    id={`radio-${item.value}`}
                    type="radio"
                    name="status"
                    value={item.value}
                    checked={params.status === item.value}
                    onChange={handleRadio}
                    className="form-radio h-5 w-5 text-indigo-500"
                  />
                  <label
                    htmlFor={`radio-${item.value}`}
                    className="ml-2 text-gray-700"
                  >
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
              type="button"
              onClick={edit ? handleUpdate : handleSubmit}
            >
              {edit ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateContact;
