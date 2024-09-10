import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../actions/useraction";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

const Profile = () => {
  const [Editing, setEditing] = useState(false);

  const [details, setDetails] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    // Initialize the details state with the current user details when the user object changes
    if (user) {
      setDetails({
        college: user.college || "",
        degree: user.degree || "",
        branch: user.branch || "",
        graduationDate: user.graduationDate || "",
        mobileNumber: user.mobileNumber || "",
        yearsOfExperience: user.yearsOfExperience || "",
        workingPlace: user.workingPlace || "",
        domain: user.domain || "",
      });
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleInputChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:3001/user/details",
        details,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(response.data.message);
      dispatch(fetchUser());
      //setEditing(false);
      setTimeout(() => setMessage(""), 3000); // Clear the message after 3 seconds
    } catch (error) {
      console.error("Error updating details:", error);
      setMessage("Error updating details");
      setTimeout(() => setMessage(""), 3000); // Clear the message after 3 seconds
    }
  };

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:3001/user/profile-image",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(response.data.message);
      dispatch(fetchUser());
      setTimeout(() => setMessage(""), 3000); // Clear the message after 3 seconds
    } catch (error) {
      console.error("Error updating profile image:", error);
      setMessage("Error updating profile image");
      setTimeout(() => setMessage(""), 3000); // Clear the message after 3 seconds
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className=" flex w-full h-[92vh]">
      <div className=" w-1/3 flex justify-center items-center relative">
        <Icon
          icon="gg:profile"
          className="w-3/4 h-1/2 rounded-[100%] border absolute"
        />
      </div>

      <div className="w-2/3 flex justify-center items-center flex-col custom-scrollbar">
        <div className="flex-none  w-full">
          <h1 className="text-3xl  ml-20 font-manrope">Profile</h1>
        </div>

        <form className="w-3/4 h-3/4 p-4" onSubmit={handleSubmit}>
          <div className="flex justify-around mb-6">
            <div className="mb-4">
              <label className="font-manrope text-2xl">
                Name:{" "}
                {Editing ? (
                  <input
                    type="text"
                    name="name"
                    value={details.name}
                    onChange={handleInputChange}
                    className="py-3 border-b-2 border-gray-300 focus:border-black outline-none"
                  />
                ) : (
                  <p className="font-manrope font-semibold py-3 border-b w-full">
                    {user.firstName} {user.lastName}
                  </p>
                )}
              </label>
            </div>
            <div className="mb-4">
              <label className="font-manrope text-2xl">
                Role:{" "}
                {Editing ? (
                  <input
                    type="text"
                    name="role"
                    value={details.role}
                    onChange={handleInputChange}
                    className="py-3 border-b-2 border-gray-300 focus:border-black outline-none"
                  />
                ) : (
                  <p className="font-manrope font-semibold py-3 border-b w-full capitalize">
                    {user.role}
                  </p>
                )}
              </label>
            </div>
          </div>
          <div className="flex pl-32 mb-6">
            <div className="mb-4">
              <label className="font-manrope text-2xl">
                Email:{" "}
                {Editing ? (
                  <input
                    type="email"
                    name="email"
                    value={details.email}
                    onChange={handleInputChange}
                    className="py-3 border-b-2 border-gray-300 focus:border-black outline-none"
                  />
                ) : (
                  <p className="font-manrope font-semibold py-3 border-b w-full">
                    {user.email}
                  </p>
                )}
              </label>
            </div>
          </div>
          {user.role === "alumni" && (
            <div className="flex justify-around mb-6">
              <div className="mb-4 ml-11">
                <label className="font-manrope text-2xl">
                  Degree:{" "}
                  {Editing ? (
                    <input
                      type="text"
                      name="degree"
                      value={details.degree}
                      onChange={handleInputChange}
                      className="py-3 border-b-2 border-gray-300 focus:border-black outline-none"
                    />
                  ) : (
                    <p className="font-manrope font-semibold py-3 border-b w-full">
                      B.Tech
                    </p>
                  )}
                </label>
              </div>

              <div className="mb-4">
                <label className="font-manrope text-2xl">
                  Branch:{" "}
                  {Editing ? (
                    <input
                      type="text"
                      name="branch"
                      value={details.branch}
                      onChange={handleInputChange}
                      className="py-3 border-b-2 border-gray-300 focus:border-black outline-none"
                    />
                  ) : (
                    <p className="font-manrope font-semibold py-3 border-b w-full">
                      Information Technology
                    </p>
                  )}
                </label>
              </div>
            </div>
          )}
          

          {/* New Div Element */}
          {user.role === "alumni" && (
            <div className="flex justify-around mb-6">
              <div className="mb-4 ml-11">
                <label className="font-manrope text-2xl">
                  Years of Experience{" "}
                  {Editing ? (
                    <input
                      type="text"
                      name="graduationYear"
                      value={details.graduationYear}
                      onChange={handleInputChange}
                      className="py-3 border-b-2 border-gray-300 focus:border-black outline-none"
                    />
                  ) : (
                    <p className="font-manrope font-semibold py-3 border-b w-full">
                      5 years
                    </p>
                  )}
                </label>
              </div>

              {/* New Field: University Name */}
              <div className="mb-4">
                <label className="font-manrope text-2xl">
                  Working place{" "}
                  {Editing ? (
                    <input
                      type="text"
                      name="universityName"
                      value={details.universityName}
                      onChange={handleInputChange}
                      className="border-b-2 border-gray-300 focus:border-black outline-none"
                    />
                  ) : (
                    <p className="font-manrope font-semibold py-3 border-b w-full">
                      Cognizant
                    </p>
                  )}
                </label>
              </div>
            </div>
          )}

          {user.role === "student" && (
            <div className="flex justify-around mb-6">
              <div className="mb-4 ml-11">
                <label className="font-manrope text-2xl">
                  Degree:{" "}
                  {Editing ? (
                    <input
                      type="text"
                      name="degree"
                      value={details.degree}
                      onChange={handleInputChange}
                      className="border p-1"
                    />
                  ) : (
                    <p className="font-manrope font-semibold py-3 border-b w-full">
                      B.Tech
                    </p>
                  )}
                </label>
              </div>

              <div className="mb-4">
                <label className="font-manrope text-2xl">
                  Branch:{" "}
                  {Editing ? (
                    <input
                      type="text"
                      name="branch"
                      value={details.branch}
                      onChange={handleInputChange}
                      className="border p-1"
                    />
                  ) : (
                    <p className="font-manrope font-semibold py-3 border-b w-full">
                      Information Technology
                    </p>
                  )}
                </label>
              </div>
            </div>
          )}

          {/* New Div Element */}
          {user.role === "student" && (
            <div className="flex justify-around mb-6">
              <div className="mb-4 ml-11">
                <label className="font-manrope text-2xl">
                  Years of Experience{" "}
                  {Editing ? (
                    <input
                      type="text"
                      name="graduationYear"
                      value={details.graduationYear}
                      onChange={handleInputChange}
                      className="border p-1"
                    />
                  ) : (
                    <p className="font-manrope font-semibold py-3 border-b w-full">
                      5 years
                    </p>
                  )}
                </label>
              </div>

              {/* New Field: University Name */}
              <div className="mb-4">
                <label className="font-manrope text-2xl">
                  Working place{" "}
                  {Editing ? (
                    <input
                      type="text"
                      name="universityName"
                      value={details.universityName}
                      onChange={handleInputChange}
                      className="border p-1"
                    />
                  ) : (
                    <p className="font-manrope font-semibold py-3 border-b w-full">
                      Cognizant
                    </p>
                  )}
                </label>
              </div>
            </div>
          )}
          <div className="mb-4 ml-28  flex flex-col">
  <label className="font-manrope text-2xl mb-2">Success Story</label>
  <textarea className="w-3/4  outline-none border-b-2 border-gray-300 focus:border-black"></textarea>
</div>

          <div className="flex justify-center space-x-6">
            <button
              type="submit"
              className="bg-primary text-white font-manrope flex justify-center w-1/3 rounded-lg px-4 py-2 mt-4"
              onClick={() => setEditing(!Editing)}
            >
              {Editing ? "Save" : "Edit"}
            </button>
            <button
              type="submit"
              className="bg-red-600 text-white font-manrope flex justify-center w-1/3 rounded-lg px-4 py-2 mt-4"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
