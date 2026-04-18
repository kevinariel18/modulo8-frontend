import { useState } from "react";
import { useAuth } from "@/presentation/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function UserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={styles.trigger}
      >
        <div style={styles.avatar}>
          {user.displayName.charAt(0).toUpperCase()}
        </div>
        <div style={styles.userInfo}>
          <span style={styles.name}>{user.displayName}</span>
          {user.isPremium && <span style={styles.badge}>Premium</span>}
        </div>
      </button>

      {isOpen && (
        <>
          <div
            style={styles.overlay}
            onClick={() => setIsOpen(false)}
          />
          <div style={styles.menu}>
            <div style={styles.menuHeader}>
              <p style={styles.email}>{user.displayName}</p>
            </div>
            
            <div style={styles.menuDivider} />
            
            <button
              onClick={() => {
                navigate("/profile");
                setIsOpen(false);
              }}
              style={styles.menuItem}
            >
              Mi perfil
            </button>
            
            {!user.isPremium && (
              <button
                onClick={() => {
                  navigate("/upgrade");
                  setIsOpen(false);
                }}
                style={styles.menuItemPremium}
              >
                Hazte Premium
              </button>
            )}
            
            <div style={styles.menuDivider} />
            
            <button
              onClick={handleLogout}
              style={styles.menuItemDanger}
            >
              Cerrar sesión
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    position: "relative" as const,
  },
  trigger: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "8px 12px",
    background: "white",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    fontSize: "16px",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "flex-start",
    gap: "2px",
  },
  name: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1a202c",
  },
  badge: {
    fontSize: "11px",
    color: "#667eea",
    fontWeight: "600",
  },
  overlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  menu: {
    position: "absolute" as const,
    top: "calc(100% + 8px)",
    right: 0,
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
    minWidth: "220px",
    zIndex: 20,
    overflow: "hidden",
  },
  menuHeader: {
    padding: "16px",
    background: "#f7fafc",
  },
  email: {
    fontSize: "12px",
    color: "#718096",
    margin: 0,
  },
  menuDivider: {
    height: "1px",
    background: "#e2e8f0",
  },
  menuItem: {
    width: "100%",
    padding: "12px 16px",
    background: "none",
    border: "none",
    textAlign: "left" as const,
    fontSize: "14px",
    color: "#2d3748",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  menuItemPremium: {
    width: "100%",
    padding: "12px 16px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    border: "none",
    textAlign: "left" as const,
    fontSize: "14px",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
  },
  menuItemDanger: {
    width: "100%",
    padding: "12px 16px",
    background: "none",
    border: "none",
    textAlign: "left" as const,
    fontSize: "14px",
    color: "#e53e3e",
    cursor: "pointer",
    transition: "background 0.2s",
  },
};
