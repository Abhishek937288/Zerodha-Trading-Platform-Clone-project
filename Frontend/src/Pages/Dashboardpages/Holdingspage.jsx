import React from "react";
import { holdings } from "@/data/data";
import { Table } from "@radix-ui/themes";

const Holdingspage = () => {
  return (
    <div className="ccc">
      <h3>Holdings ({holdings.length})</h3>
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

	<Table.Body >
    { holdings.map((stock, idx) => {
  const currVal = stock.price * stock.qty;
  const isProfit = currVal - stock.avg * stock.qty >= 0;
  const profitClass = isProfit ? "text-green-600" : "text-red-600";
  const dayClass = stock.isLoss ? "text-red-600" : "text-green-600";
  return (
    <Table.Row key={idx}>
      <Table.RowHeaderCell>{stock.name}</Table.RowHeaderCell>
      <Table.Cell>{stock.qty}</Table.Cell>
      <Table.Cell>{stock.avg.toFixed(2)}</Table.Cell>
      <Table.Cell>{stock.price.toFixed(2)}</Table.Cell>
      <Table.Cell>{currVal.toFixed(2)}</Table.Cell>
      <Table.Cell className={profitClass}>
        {(currVal - stock.avg * stock.qty).toFixed(2)}
      </Table.Cell>
      <Table.Cell className={profitClass}>{stock.net}</Table.Cell>
      <Table.Cell className={dayClass}>{stock.day}</Table.Cell>
    </Table.Row>
  );
})}
	</Table.Body>
</Table.Root>

      </div>
    </div>
  );
};

export default Holdingspage;
