import React from "react";
import { Table } from "@radix-ui/themes";
import { positions } from "@/data/data";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { getPositions } from "@/Mutation/stockMutationFn.js";

const Positionspage = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["stocks"],
    queryFn: getPositions,
  });

  if (isPending) {
    return <p> Loading ..</p>;
  }

  if (error) {
    return <p>error is {error.message}</p>;
  }

  return (
    <div className="container mt-5 md:px-10">
      <h3>Position({data.length})</h3>
      <div className=" flex justify-center  w-full ">
        <Table.Root className="w-full px-5 sm:px-10 md:px-15">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Product</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Qty</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>price</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>net</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>day</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>isLoss</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.map((stock, idx) => {
              const currVal = stock.price * stock.qty;
              const isProfit = currVal - stock.avg * stock.qty >= 0;
              const profitClass = isProfit ? "text-green-600" : "text-red-600";
              const dayClass = stock.isLoss ? "text-red-600" : "text-green-600";
              return (
                <Table.Row key={idx}>
                  <Table.RowHeaderCell>{stock.product}</Table.RowHeaderCell>
                  <Table.Cell>{stock.name}</Table.Cell>
                  <Table.Cell>{stock.qty.toFixed(2)}</Table.Cell>
                  <Table.Cell>{stock.avg.toFixed(2)}</Table.Cell>
                  <Table.Cell>{stock.price.toFixed(2)}</Table.Cell>
                  <Table.Cell className={dayClass}>{stock.day}</Table.Cell>

                  <Table.Cell className={profitClass}>
                    {(currVal - stock.avg * stock.qty).toFixed(2)}
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

export default Positionspage;
