import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../constants/Buttons";
import Sidebar from "../constants/Layout";
import Card from "../constants/Card";
import notFound from "../../components/assets/notFound.svg";

const Contacts = () => {
  // Select contacts from the Redux store
  const contacts = useSelector((state: any) => state.contacts);

  // Initialize navigation hook
  const navigate = useNavigate();

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <div className="w-full lg:w-[1190px]">
        <Button
          text="Create Contact"
          onClick={() => {
            navigate("/contacts/create");
          }}
        />
        <p className="mt-5 text-lg tracking-widest text-center text-primary">
          All Contacts
        </p>

        <div className="flex flex-col items-center justify-center m-5 lg:m-0">
          {contacts?.items?.length > 0 ? (
            // Render contact list if there are contacts available
            <div className="grid grid-cols-1 gap-5 mt-10 lg:grid-cols-2">
              {contacts.items.map((item: any) => (
                <Card details={item} key={item.id} />
              ))}
            </div>
          ) : (
            // Display message if no contacts are available
            <div className="flex items-center gap-5 p-5 mt-10 border rounded border-primary">
              <img
                className="w-[56px] h-[56px]"
                src={notFound}
                alt="Not Found"
              />
              <p className="font-medium text-start text-primary">
                No contacts found!
                <br />
                Please add a contact using the <br /> Create Contact button.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contacts;
