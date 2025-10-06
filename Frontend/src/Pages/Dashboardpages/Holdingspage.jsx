import React from "react";
import { Table } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { getHoldings } from "@/Mutation/stockMutationFn.js";
import HoldingsCharts from "@/Components/Dashboardcompo/Dashboard/HoldingsCharts";
import { Skeleton } from "@radix-ui/themes";
const a = er ;

const Holdingspage = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["stocks"],
    queryFn: getHoldings,
  });
  if (isPending) {
    return (
      <div>
        <h3>
          Holdings <Skeleton width="40px" height="20px" />
        </h3>
        <div className="flex justify-center w-full">
          <Table.Root className="w-full px-5 sm:px-10 md:px-15">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Instrument</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Qty</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Avg.cost</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Ltp</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Cur.val</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>P&l</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Net chg</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Day chg.</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {Array.from({ length: 5 }).map((_, idx) => (
                <Table.Row key={idx}>
                  {Array.from({ length: 8 }).map((_, colIdx) => (
                    <Table.Cell key={colIdx}>
                      <Skeleton width="80px" height="16px" />
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </div>

        <div className="mt-5">
          <Skeleton width="100%" height="300px" /> 
        </div>
      </div>
    );
  }
  if (error) {
    return <p> error is {error.message} </p>;
  }

  console.log(data);
  if(data.length == 0){
    return <p>NO data</p>
  }
  return (
    <div className="">
      <h3>Holdings ({data.length})</h3>
      <div className=" flex justify-center  w-full ">
        <Table.Root className="w-full px-5 sm:px-10 md:px-15">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Instrument</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Qty</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Avg.cost</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Ltp</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Cur.val</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>P&l</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Net chg</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Day chg.</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.map((stock, idx) => {
              const price = stock.price ?? 0;
              const avg = stock.avg ?? 0;
              const qty = stock.qty ?? 0;
              const currVal = price * qty;

              const isProfit = currVal - avg * qty >= 0;
              const profitClass = isProfit ? "text-green-600" : "text-red-600";
              const dayClass = stock.isLoss ? "text-red-600" : "text-green-600";

              return (
                <Table.Row key={idx}>
                  <Table.RowHeaderCell>
                    {stock.name ?? "N/A"}
                  </Table.RowHeaderCell>
                  <Table.Cell>{qty}</Table.Cell>
                  <Table.Cell>{avg.toFixed(2)}</Table.Cell>
                  <Table.Cell>{price.toFixed(2)}</Table.Cell>
                  <Table.Cell>{currVal.toFixed(2)}</Table.Cell>
                  <Table.Cell className={profitClass}>
                    {(currVal - avg * qty).toFixed(2)}
                  </Table.Cell>
                  <Table.Cell className={profitClass}>
                    {stock.net ?? 0}
                  </Table.Cell>
                  <Table.Cell className={dayClass}>{stock.day ?? 0}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      </div>
      <div className="mt-5">
        <HoldingsCharts holdings={data} />
      </div>
    </div>
  );
};

export default Holdingspage;
