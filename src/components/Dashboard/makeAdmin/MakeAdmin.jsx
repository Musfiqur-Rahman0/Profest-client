import { Button } from "@/components/ui/button";
import useAxiosSecuire from "@/Hooks/useAxiosSecuire";
import React, { useState } from "react";

import Swal from "sweetalert2";

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecuire();
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [previousRole, setPreviousRole] = useState("");

  const handleSearch = async () => {
    try {
      const res = await axiosSecure.get(`/users?email=${email}`);
      if (res.data) {
        setUser(res.data);
        setPreviousRole(res.data.role);
      } else {
        Swal.fire("Not found", "User not found", "error");
        setUser(null);
      }
    } catch (error) {
      Swal.fire("Error", "Failed to search user", "error");
      setUser(null);
    }
  };

  const handleUpdateRole = async (role) => {
    try {
      const res = await axiosSecure.patch(`/users/role/${email}`, { role });
      Swal.fire("Success", res.data.message, "success");
      setUser({ ...user, role });
    } catch (error) {
      Swal.fire("Error", "Failed to update role", "error");
    }
  };

  console.log(previousRole);
  return (
    <div className="p-8 bg-white rounded shadow w-full mx-auto space-y-4">
      <h2 className="text-2xl font-bold mb-4">Manage Admin</h2>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter user email"
        className="border p-2 w-full"
      />
      <Button onClick={handleSearch}>Search</Button>

      {user && (
        <div className="mt-4">
          {/* <p>
            <strong>Name:</strong> {user.name || "N/A"}
          </p> */}
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p className="mb-4">
            <strong>Current Role:</strong> {user.role}
          </p>

          {user.role === "admin" ? (
            <Button
              variant="destructive"
              onClick={() => handleUpdateRole(previousRole)}
            >
              Remove Admin
            </Button>
          ) : (
            <Button onClick={() => handleUpdateRole("admin")}>
              Make Admin
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default MakeAdmin;
