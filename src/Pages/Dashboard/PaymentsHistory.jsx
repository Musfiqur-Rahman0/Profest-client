import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAxiosSecuire from "@/Hooks/useAxiosSecuire";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const PaymentsHistory = () => {
  const userEmail = "musfiqurrhaman6@gmail.com";
  const axiosSecure = useAxiosSecuire();

  const {
    isPending,
    data: payments = [],
    isError,
  } = useQuery({
    queryKey: ["payments", userEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${userEmail}`);
      return res.data;
    },
  });

  if (isPending) {
    return <p>Loading payments history...</p>;
  }
  return (
    <Card className="w-full mt-10 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gray-800">
          Payment History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100 hover:bg-gray-200">
                <TableHead className="text-gray-700 font-medium">
                  Parcel ID
                </TableHead>
                <TableHead className="text-gray-700 font-medium text-center">
                  Email
                </TableHead>
                <TableHead className="text-gray-700 font-medium text-center">
                  Amount
                </TableHead>
                <TableHead className="text-gray-700 font-medium">
                  Transaction ID
                </TableHead>
                <TableHead className="text-center text-gray-700 font-medium">
                  Payment Method
                </TableHead>
                <TableHead className="text-gray-700 font-medium">
                  Paid At
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow
                  key={payment.transactionId}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="font-mono text-sm text-gray-800">
                    {payment.parcelId}
                  </TableCell>
                  <TableCell className="text-sm text-center text-gray-800">
                    {payment.email}
                  </TableCell>
                  <TableCell className="text-sm text-center text-green-600 font-semibold">
                    ${payment.amount}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-gray-700">
                    {payment.transactionId}
                  </TableCell>
                  <TableCell className="text-center text-sm text-gray-800">
                    {payment.paymentMethod.join(", ")}
                  </TableCell>
                  <TableCell className="text-sm text-gray-700">
                    {new Date(payment.paid_at).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentsHistory;
