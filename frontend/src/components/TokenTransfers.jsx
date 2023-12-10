import React from 'react';
import { Table } from 'react-bootstrap';

const TokenTransfersTable = ({ tokenTransfers }) => {
  return (
    <Table style={{marginTop:"2%"}} striped bordered hover>
      <thead>
        <tr>

          <th>Symbol</th>
          <th>Formatted Amount</th>
          <th>To</th>
          <th>Transaction Hash</th>
          <th>Block Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {tokenTransfers.map((transfer, index) => (
          <tr key={index}>

            <td>{transfer.token.symbol}</td>
            <td>{transfer.formattedAmount}</td>
            <td>{transfer.to.identity}</td>
            <td>{transfer.transactionHash}</td>
            <td>{new Date(transfer.blockTimestamp).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TokenTransfersTable;
