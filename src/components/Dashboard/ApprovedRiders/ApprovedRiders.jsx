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
import { motion, AnimatePresence } from "motion/react";
import { searchRiders } from "@/lib/utils";
import SearchInput from "@/components/Shared/SearchInput";

const ApprovedRiders = () => {
  const axiosSecure = useAxiosSecuire();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: riders = [], isLoading } = useQuery({
    queryKey: ["approvedRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders?status=approved");
      return res.data;
    },
  });

  const filteredRiders = searchRiders(riders, searchQuery);

  // Optional: Move back to pending
  const mutation = useMutation({
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
      queryClient.invalidateQueries(["approvedRiders"]);
    },
  });

  const handleRevert = (id) => {
    Swal.fire({
      title: "Revert to pending?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate({ id, status: "pending" });
      }
    });
  };

  if (isLoading) return <p>Loading approved riders...</p>;

  return (
    <div className="p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Approved Riders</h2>

      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search Rejected riders by name"
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
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleRevert(rider._id)}
                    >
                      Revert to Pending
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

export default ApprovedRiders;
