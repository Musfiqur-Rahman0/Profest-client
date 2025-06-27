import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAxiosSecuire from "@/Hooks/useAxiosSecuire";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const userEmail = "musfiqurrhaman6@gmail.com";
const MYparcels = () => {
  const axiosSecure = useAxiosSecuire();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: myParcels = [], isLoading } = useQuery({
    queryKey: ["my-parcels", userEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${userEmail}`);
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/parcels/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-parcels", userEmail] });
      Swal.fire("Deleted!", "Your parcel has been deleted.", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Something went wrong while deleting.", "error");
    },
  });

  // handler function to delete a parcel using id and tanstack query usMutation hook.
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This parcel will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  // handler function to pay  using stripe js
  const handlePay = (id) => {
    console.log(id);
    navigate(`/dashboard/payment/${id}`);
  };

  if (isLoading) return <p>Loading parcels...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        My Parcels ({myParcels.length})
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Parcel Name</TableHead>
            <TableHead>Parcel Owner</TableHead>
            <TableHead>Parcel Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className={"text-center"}>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {myParcels.map((parcel) => (
            <TableRow key={parcel._id}>
              <TableCell>{parcel.parcelName}</TableCell>
              <TableCell>{parcel.sender?.name}</TableCell>
              <TableCell className={"capitalize"}>
                {parcel.parcelType}
              </TableCell>
              <TableCell>{parcel.status || "N/A"}</TableCell>
              <TableCell className="flex justify-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    Swal.fire(
                      "Parcel Details",
                      JSON.stringify(parcel, null, 2),
                      "info"
                    )
                  }
                >
                  View
                </Button>
                <Button
                  variant=""
                  size="sm"
                  className={"cursor-pointer bg-green-500 hover:bg-green-600"}
                  onClick={() => handlePay(parcel._id)}
                >
                  Pay
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(parcel._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MYparcels;
