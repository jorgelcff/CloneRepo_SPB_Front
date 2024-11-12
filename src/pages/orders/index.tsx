import React, { useEffect, useState } from "react";
import { User } from "../../interface/user";
import { response } from "../../utils/demo/tableData";
import "./styles.css";
import OrderModal, { Order } from "../../components/modal-orders";

const Orders: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(
    undefined
  );

  const handleAddOrder = () => {
    setSelectedOrder(undefined);
    setIsModalOpen(true);
  };

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleSaveOrder = (order: Order) => {
    // Lógica para salvar o pedido (adição ou edição)
    console.log("Pedido salvo:", order);
  };
  const resultsPerPage = 5;
  const totalResults = response.length;

  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page]);

  const onPageChange = (p: number) => {
    setPage(p);
  };

  const addClassByStatus = (status: string): string => {
    switch (status) {
      case "primary":
        return "status-primary";
      case "danger":
        return "status-danger";
      case "success":
        return "status-success";
      case "warning":
        return "status-warning";
      case "neutral":
        return "status-neutral";
      default:
        return "";
    }
  };
  return (
    <div>
      <div className="table-container">
        <div className="table-header">
          <h2>Pedidos</h2>
          <button className="add-button" onClick={handleAddOrder}>
            Adicionar Pedido
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Valor</th>
              <th>Status</th>
              <th>Data</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, i) => (
              <tr key={i}>
                <td>
                  <div className="user-info">
                    <img
                      src={user.avatar}
                      alt="User avatar"
                      className="avatar"
                    />
                    <div>
                      <p>{user.name}</p>
                    </div>
                  </div>
                </td>
                <td>${user.amount.toFixed(2)}</td>
                <td>
                  {" "}
                  <span
                    className={`badge ${addClassByStatus(user.status)}`}
                    data-tooltip={user.status}
                  ></span>
                </td>

                <td>{new Date(user.date).toLocaleDateString()}</td>
                <td>
                  <button
                    className="action-button-edit"
                    onClick={() => handleEditOrder(user)}
                  >
                    Edit
                  </button>
                  <button className="action-button-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page * resultsPerPage >= totalResults}
          >
            Next
          </button>
        </div>
      </div>
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveOrder}
        order={selectedOrder}
      />
    </div>
  );
};

export default Orders;
