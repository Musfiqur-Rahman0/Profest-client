import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Swal from "sweetalert2";
import useAxiosSecuire from "@/Hooks/useAxiosSecuire";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const PendingRiders = () => {
  const axiosSecure = useAxiosSecuire();
  const queryClient = useQueryClient();

  // ✅ Fetch all pending riders
  const {
    data: riders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pendingRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders?status=pending");
      return res.data;
    },
  });

  // ✅ Mutation for updating rider status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      return axiosSecure.patch(`/riders/${id}`, { status });
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Status updated",
        timer: 1500,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries(["pendingRiders"]);
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Failed to update status",
      });
    },
  });

  const handleUpdateStatus = (id, status) => {
    Swal.fire({
      title: `Are you sure you want to ${status} this rider?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatusMutation.mutate({ id, status });
      }
    });
  };

  if (isLoading) {
    return <p>Loading pending riders...</p>;
  }

  return (
    <div className="p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Pending Riders</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>Warehouse</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {riders.map((rider) => (
            <TableRow key={rider._id}>
              <TableCell>{rider.name}</TableCell>
              <TableCell>{rider.email}</TableCell>
              <TableCell>{rider.region}</TableCell>
              <TableCell>{rider.warehouse}</TableCell>
              <TableCell className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleUpdateStatus(rider._id, "approved")}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleUpdateStatus(rider._id, "rejected")}
                >
                  Reject
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    Swal.fire({
                      title: "Rider Details",
                      html: `
                        <p><strong>Name:</strong> ${rider.name}</p>
                        <p><strong>Email:</strong> ${rider.email}</p>
                        <p><strong>Region:</strong> ${rider.region}</p>
                        <p><strong>Warehouse:</strong> ${rider.warehouse}</p>
                        <p><strong>Contact:</strong> ${rider.contact}</p>
                        <p><strong>NID:</strong> ${rider.nid}</p>
                      `,
                    })
                  }
                >
                  Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PendingRiders;
