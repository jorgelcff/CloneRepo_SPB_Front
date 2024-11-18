import React, { useEffect, useState } from "react"; // Ou faça uma requisição à API
import "./styles.css";
import OrderModal from "../../components/modal-orders";
import OrderService from "../../services/OrderService";
import { Orders as OrderResponse, Order } from "../../interface/Order";

const orderService = new OrderService();

const Orders: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<OrderResponse>(); // Altere para o tipo Order
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")!);

  useEffect(() => {
    getOrdersData();
  }, []);

  const getOrdersData = async () => {
    setIsLoading(true);
    try {
      const response: OrderResponse = await orderService.getOrdersAdmin(
        user.id
      );
      setData(response);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  // const handleAddOrder = () => {
  //   setSelectedOrder(undefined);
  //   setIsModalOpen(true);
  // };

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleSaveOrder = (order: Order) => {
    if (order.id) {
      // Atualiza o pedido
      orderService
        .updateOrderStatus(user.id, order.id, order.status)
        .then(() => {
          getOrdersData();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Cria um novo pedido
      orderService
        .createOrder(user.id, {
          items: order.products.map((product) => ({
            productId: product.id,
            quantity: product.quantity,
          })),
        })
        .then(() => {
          getOrdersData();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const resultsPerPage = 5;
  const totalResults = data?.length;

  useEffect(() => {
    setData(data?.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page]);

  const onPageChange = (p: number) => {
    setPage(p);
  };

  const addClassByStatus = (status: string): string => {
    switch (status) {
      case "PENDING":
        return "status-pendding";
      case "COMPLETED":
        return "status-success";
      case "CANCELED":
        return "status-danger";
      default:
        return "status-neutral";
    }
  };

  return (
    <div>
      <div className="table-container">
        <div className="table-header">
          <h2>Pedidos</h2>
          {/* <button className="add-button" onClick={handleAddOrder}>
            Adicionar Pedido
          </button> */}
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Valor</th>
              <th>Status</th>
              <th>Data</th>
              <th className="fit">Ação</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <>
                {[...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td>
                      <div className="user-info">
                        <div className="skeleton short"></div>
                      </div>
                    </td>
                    <td>
                      <div className="skeleton medium"></div>
                    </td>
                    <td>
                      <div className="skeleton short"></div>
                    </td>
                    <td>
                      <div className="skeleton medium"></div>
                    </td>
                    <td>
                      <div className="skeleton long"></div>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              data?.map((order, i) => (
                <tr key={i}>
                  <td>
                    <div className="user-name">
                      <p>{order.user.name}</p> {/* Exibe o nome do usuário */}
                    </div>
                  </td>
                  <td>R${order.total.toFixed(2)}</td>{" "}
                  {/* Exibe o valor total do pedido */}
                  <td>
                    <span
                      className={`badge ${addClassByStatus(order.status)}`}
                      data-tooltip={order.status}
                    ></span>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>{" "}
                  {/* Exibe a data de criação */}
                  <td className="fit">
                    <button
                      className="action-button-edit"
                      onClick={() => handleEditOrder(order)}
                    >
                      Editar
                    </button>
                    <button className="action-button-delete">Excluir</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
            Anterior
          </button>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page * resultsPerPage >= totalResults!}
          >
            Próximo
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
