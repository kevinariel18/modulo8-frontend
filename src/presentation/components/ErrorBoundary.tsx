import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error capturado por ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={styles.container}>
          <div style={styles.card}>
            <div style={styles.icon}>⚠️</div>
            <h1 style={styles.title}>Algo salió mal</h1>
            <p style={styles.message}>
              {this.state.error?.message || "Ha ocurrido un error inesperado"}
            </p>
            <button
              onClick={() => window.location.reload()}
              style={styles.button}
            >
              Recargar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f7fafc",
    padding: "20px",
  },
  card: {
    background: "white",
    borderRadius: "16px",
    padding: "40px",
    maxWidth: "400px",
    textAlign: "center" as const,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  },
  icon: {
    fontSize: "48px",
    marginBottom: "16px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1a202c",
    marginBottom: "12px",
  },
  message: {
    fontSize: "14px",
    color: "#718096",
    marginBottom: "24px",
  },
  button: {
    padding: "12px 24px",
    fontSize: "14px",
    fontWeight: "600",
    color: "white",
    background: "#667eea",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
