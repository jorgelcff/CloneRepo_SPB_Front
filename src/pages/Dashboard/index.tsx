// import React, { useState, useEffect } from "react";
import "./styles.css";
// import { response } from "../../utils/demo/tableData.ts";
// import { User } from "../../interface/user.js";
// import Tabs, { Tab } from "../../components/tabs";

type Legend = {
  title: string;
  color: string;
};

const doughnutLegends: Legend[] = [
  { title: "Skin Care", color: "bg-blue-500" },
  { title: "Olhos", color: "bg-teal-600" },
  { title: "Boca", color: "bg-purple-600" },
];

const lineLegends: Legend[] = [
  { title: "Orgânico", color: "bg-teal-600" },
  { title: "Pago", color: "bg-purple-600" },
];

// type ChartOptions = {
//   data: {
//     datasets: { data: number[]; backgroundColor: string[]; label: string }[];
//     labels: string[];
//   };
//   options: { responsive: boolean; cutoutPercentage?: number };
// };

// const doughnutOptions: ChartOptions = {
//   data: {
//     datasets: [
//       {
//         data: [33, 33, 33],
//         backgroundColor: ["#0694a2", "#1c64f2", "#7e3af2"],
//         label: "Dataset 1",
//       },
//     ],
//     labels: ["Shoes", "Shirts", "Bags"],
//   },
//   options: { responsive: true, cutoutPercentage: 80 },
// };

// const lineOptions = {
//   data: {
//     labels: ["January", "February", "March", "April", "May", "June", "July"],
//     datasets: [
//       {
//         label: "Organic",
//         backgroundColor: "#0694a2",
//         borderColor: "#0694a2",
//         data: [43, 48, 40, 54, 67, 73, 70],
//         fill: false,
//       },
//       {
//         label: "Paid",
//         backgroundColor: "#7e3af2",
//         borderColor: "#7e3af2",
//         data: [24, 50, 64, 74, 52, 51, 65],
//         fill: false,
//       },
//     ],
//   },
//   options: { responsive: true },
// };

function Dashboard() {
  // const [page, setPage] = useState<number>(1);
  // const [data, setData] = useState<User[]>([]);
  // const resultsPerPage = 10;
  // const totalResults = response.length;

  // const user = JSON.parse(localStorage.getItem("user")!);

  // useEffect(() => {
  //   setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  // }, [page]);

  // const onPageChange = (p: number) => {
  //   setPage(p);
  // };

  // const addClassByStatus = (status: string): string => {
  //   switch (status) {
  //     case "primary":
  //       return "status-primary";
  //     case "danger":
  //       return "status-danger";
  //     case "success":
  //       return "status-success";
  //     case "warning":
  //       return "status-warning";
  //     case "neutral":
  //       return "status-neutral";
  //     default:
  //       return "";
  //   }
  // };

  return (
    <div className="c">
      <div className="dashboard">
        <div className="card-grid">
          <div className="info-card">
            <h3>Clientes</h3>
            <p>6389</p>
          </div>
          <div className="info-card">
            <h3>Faturamento</h3>
            <p>R$46,760.89</p>
          </div>
          <div className="info-card">
            <h3>Vendas Mensais</h3>
            <p>376</p>
          </div>
          <div className="info-card">
            <h3>Contratos Pendentes</h3>
            <p>35</p>
          </div>
        </div>

        <div className="chart-grid">
          <div className="chart-card">
            <h2>Receita</h2>
            <div className="chart-placeholder">Doughnut Chart</div>
            <div className="chart-legend">
              {doughnutLegends.map((legend, i) => (
                <span key={i}>{legend.title}</span>
              ))}
            </div>
          </div>
          <div className="chart-card">
            <h2>Trafego</h2>
            <div className="chart-placeholder">Line Chart</div>
            <div className="chart-legend">
              {lineLegends.map((legend, i) => (
                <span key={i}>{legend.title}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

// <Tabs>
//           <Tab label="Pedidos">
//             <div className="tab-content">
//               <div className="table-container">
//                 <table className="table">
//                   <thead>
//                     <tr>
//                       <th>Cliente</th>
//                       <th>Valor</th>
//                       <th>Status</th>
//                       <th>Data</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {data.map((user, i) => (
//                       <tr key={i}>
//                         <td>
//                           <div className="user-info">
//                             <img
//                               src={user.avatar}
//                               alt="User avatar"
//                               className="avatar"
//                             />
//                             <div>
//                               <p>{user.name}</p>
//                               <p>{user.job}</p>
//                             </div>
//                           </div>
//                         </td>
//                         <td>${user.amount.toFixed(2)}</td>
//                         <td>
//                           {" "}
//                           <span
//                             className={`badge ${addClassByStatus(user.status)}`}
//                             data-tooltip={user.status}
//                           ></span>
//                         </td>

//                         <td>{new Date(user.date).toLocaleDateString()}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//                 <div className="pagination">
//                   <button
//                     onClick={() => onPageChange(page - 1)}
//                     disabled={page === 1}
//                   >
//                     Previous
//                   </button>
//                   <button
//                     onClick={() => onPageChange(page + 1)}
//                     disabled={page * resultsPerPage >= totalResults}
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </Tab>
//           <Tab label="Produtos">
//             <div className="tab-content">Conteúdo dos Produtos</div>
//           </Tab>
//         </Tabs>
