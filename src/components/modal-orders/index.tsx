// src/components/OrderModal.tsx
import React, { useState, useEffect } from "react";
import "./styles.css";

export interface Order {
  id?: number;
  customerName: string;
  orderDate: string;
  status: string;
  totalAmount: number;
}

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (order: Order) => void;
  order?: Order;
}

const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  onSave,
  order,
}) => {
  const [customerName, setCustomerName] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [status, setStatus] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (order) {
      setCustomerName(order.customerName);
      setOrderDate(order.orderDate);
      setStatus(order.status);
      setTotalAmount(order.totalAmount);
    } else {
      setCustomerName("");
      setOrderDate("");
      setStatus("");
      setTotalAmount(0);
    }
  }, [order]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: order?.id, customerName, orderDate, status, totalAmount });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{order ? "Editar Pedido" : "Adicionar Pedido"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="customerName">Nome do Cliente</label>
            <input
              type="text"
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="orderDate">Data do Pedido</label>
            <input
              type="date"
              id="orderDate"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="status">Status</label>
            <input
              type="text"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="totalAmount">Valor Total</label>
            <input
              type="number"
              id="totalAmount"
              value={totalAmount}
              onChange={(e) => setTotalAmount(Number(e.target.value))}
              required
            />
          </div>
          <div className="button-group">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="save-button">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
