import React, { useState } from "react";
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
import SearchInput from "@/components/Shared/SearchInput";
import { AnimatePresence, motion } from "framer-motion";
import { searchRiders } from "@/lib/utils";

const PendingRiders = () => {
  const axiosSecure = useAxiosSecuire();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: riders = [], isLoading } = useQuery({
    queryKey: ["pendingRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders?status=pending");
      return res.data;
    },
  });

  const filteredRiders = searchRiders(riders, searchTerm);

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status, email }) => {
      return axiosSecure.patch(`/riders/${id}`, { status, email });
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

  const handleUpdateStatus = (id, status, email) => {
    Swal.fire({
      title: `Are you sure you want to ${status} this rider?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatusMutation.mutate({ id, status, email });
      }
    });
  };

  if (isLoading) {
    return <p>Loading pending riders...</p>;
  }

  return (
    <div className="p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Pending Riders</h2>

      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search pending riders by name..."
      />

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
          <AnimatePresence>
            {filteredRiders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No riders found.
                </TableCell>
              </TableRow>
            ) : (
              filteredRiders.map((rider) => (
                <motion.tr
                  key={rider._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <TableCell>{rider.name}</TableCell>
                  <TableCell>{rider.email}</TableCell>
                  <TableCell>{rider.region}</TableCell>
                  <TableCell>{rider.warehouse}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      type="button"
                      size="sm"
                      onClick={() =>
                        handleUpdateStatus(rider._id, "approved", rider.email)
                      }
                    >
                      Approve
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      onClick={() =>
                        handleUpdateStatus(rider._id, "rejected", rider.email)
                      }
                    >
                      Reject
                    </Button>
                    <Button
                      type="button"
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
                </motion.tr>
              ))
            )}
          </AnimatePresence>
        </TableBody>
      </Table>
    </div>
  );
};

export default PendingRiders;
