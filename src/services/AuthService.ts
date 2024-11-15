import HttpService from "./HttpService";

interface LoginResponse {
  token: string;
  user: unknown;
}

interface RegisterData {
  email: string;
  password: string;
  [key: string]: unknown;
}

class AuthService extends HttpService {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await this.post<LoginResponse>("/auth/login", {
      email,
      password,
    });
    if (response.token) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
    }
    return response;
  }

  getUser(): unknown {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  async register(userData: RegisterData): Promise<unknown> {
    return this.post("/auth/register", userData);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }

  async forgotPassword(email: string): Promise<unknown> {
    return this.post("/auth/forgot-password", { email });
  }

  async resetPassword(token: string, password: string): Promise<unknown> {
    const response = await this.post("/auth/reset-password", {
      token,
      password,
    });
    return response;
  }
}

export default AuthService;
