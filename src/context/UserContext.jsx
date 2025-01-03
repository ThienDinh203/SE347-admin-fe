import React from "react";
const UserContext = React.createContext({ id: "", userName: "", token: "", auth: false });

const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(
    sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : { id: "", userName: "", token: "", auth: false }
  );
  React.useEffect(() => {
    if (!user.auth) {
      if (window.location.pathname !== "/login")
        window.location.href = "/login";
    }
  }, [user.auth]);
  const login = (user) => {
    const userRole = user.roles && user.roles.length > 0 ? user.roles[0] : "";
    setUser({
      id: user.id,
      userName: user.username,
      token: user.token,
      auth: true,
      role: userRole,
    });
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        id: user.id,
        userName: user.username,
        token: user.token,
        auth: true,
        role: userRole,
      })
    );
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setUser(() => ({
      id: "",
      userName: "",
      token: "",
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
