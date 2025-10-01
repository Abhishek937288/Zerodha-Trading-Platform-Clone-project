import React from "react";
import { Table } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/Mutation/stockMutationFn.js";

const Orderspages = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["stocks"],
    queryFn: getOrders,
    staleTime: 0,
  });

  if (isPending) {
    return <p>Loading .. </p>;
  }
  if (error) {
    return <p>error : {error.message}</p>;
  }

  console.log(data);
  return (
    <div className="">
      <h3>Orders ({data.length})</h3>
      <div className=" flex justify-center  w-full ">
        <Table.Root className="w-full px-5 sm:px-10 md:px-15">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Quantity</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Mode</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Time</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.map((stock, idx) => {
              return (
                <Table.Row key={idx}>
                  <Table.RowHeaderCell>{stock.name}</Table.RowHeaderCell>
                  <Table.Cell>{stock.qty}</Table.Cell>

                  <Table.Cell>{(stock.price ?? 0).toFixed(2)}</Table.Cell>
                  <Table.Cell>{stock.mode}</Table.Cell>
                  <Table.Cell>
                    {new Date(stock.createdAt).toLocaleString()}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
};

export default Orderspages;
