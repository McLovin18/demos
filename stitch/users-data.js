// Sistema de gestión de usuarios
export const DEMO_USERS = [
  {
    id: "admin-001",
    email: "admin@tecnothings.com",
    password: "admin123",
    name: "Juan Administrador",
    type: "admin",
    avatar: "JA",
  },
  {
    id: "user-001",
    email: "cliente@tecnothings.com",
    password: "cliente123",
    name: "Alejandro García",
    type: "customer",
    avatar: "AG",
  },
];

// Guardar usuario autenticado en localStorage
export const loginUser = (email, password) => {
  const user = DEMO_USERS.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      type: user.type,
      avatar: user.avatar,
      loginTime: new Date().toISOString(),
    };
    localStorage.setItem("tecnoThingsUser", JSON.stringify(userData));
    return userData;
  }
  return null;
};

// Obtener usuario autenticado
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("tecnoThingsUser");
  return userStr ? JSON.parse(userStr) : null;
};

// Registrar nuevo usuario
export const registerUser = (name, email, password) => {
  // Verificar si el email ya existe
  if (DEMO_USERS.some((u) => u.email === email)) {
    return { success: false, message: "El email ya está registrado" };
  }

  const newUser = {
    id: `user-${Date.now()}`,
    email,
    password,
    name,
    type: "customer",
    avatar: name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase(),
  };

  DEMO_USERS.push(newUser);
  localStorage.setItem("tecnoThingsUsers", JSON.stringify(DEMO_USERS));

  // Auto-login después de registrarse
  const userData = {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
    type: newUser.type,
    avatar: newUser.avatar,
    loginTime: new Date().toISOString(),
  };
  localStorage.setItem("tecnoThingsUser", JSON.stringify(userData));
  return { success: true, user: userData };
};

// Cerrar sesión
export const logoutUser = () => {
  localStorage.removeItem("tecnoThingsUser");
};

// Inicializar usuarios demo en localStorage
export const initializeDemoUsers = () => {
  if (!localStorage.getItem("tecnoThingsUsers")) {
    localStorage.setItem("tecnoThingsUsers", JSON.stringify(DEMO_USERS));
  }
};

// Obtener todos los usuarios (para debug)
export const getAllUsers = () => {
  const stored = localStorage.getItem("tecnoThingsUsers");
  return stored ? JSON.parse(stored) : DEMO_USERS;
};
