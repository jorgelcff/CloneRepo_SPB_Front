// src/pages/Login.tsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import ImageLight from "../assets/img/login-office.jpeg";
// import ImageDark from "../assets/img/login-office-dark.jpeg";
// import AuthService from "../../services/AuthService";
// import { useAlert } from "react-alert";
import "./styles.css";

// const authService = new AuthService();

const Login: React.FC = () => {
  const [isMounted, setIsMounted] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigation = useNavigate();

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  // const alert = useAlert();
  // const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // const response = await authService.login(email, password);

      const response = {
        access_token: true,
      };
      if (response.access_token) {
        // alert.success("Login efetuado com sucesso!");
        if (isMounted) {
          setIsSubmitting(false);
        }
        const user = {
          user: {
            id: 1,
            uuid: "2fe3b466-df69-4957-a18b-86d854c5ee56",
            empresaId: -1,
            nome: "Jorge Freitas",
            email: "jorge@gmail.com",
            dataCriacao: "2024-11-01T02:02:45.350Z",
            dataUltimoAcesso: "2024-11-01T02:02:47.508Z",
            dataAtualizacao: "2024-11-01T02:02:47.510Z",
            ativo: true,
            dataDeletado: null,
            role: "SUPERADMIN",
          },
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvcmdlQGdtYWlsLmNvbSIsInN1YiI6MSwiaWF0IjoxNzMxMzYzNjQwfQ.jBKxp-JbLE79rCY4Ifihh6lmCChJHO1u-ZNSNOFIiLA",
        };
        localStorage.setItem("user", JSON.stringify(user));

        navigation("/dashboard");
      }
    } catch {
      // console.error(error);
      // if (error.code === "ERR_BAD_REQUEST") {
      //   alert.error("Credenciais Incorretas!");
      // } else {
      //   alert.error("Erro do Servidor.");
      // }
    }

    if (isMounted) {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-image">
          <img
            src="https://front-bmq.vercel.app/midia/logo2.png"
            alt="logo"
            className="image"
          />
        </div>
        <main className="login-form-container">
          <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="maria@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  id="password"
                  placeholder="***************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="login-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Entrando..." : "Entrar"}
              </button>
            </form>
            <p>
              <Link to="/forgot-password" className="forgot-password-link">
                Esqueceu a senha?
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
