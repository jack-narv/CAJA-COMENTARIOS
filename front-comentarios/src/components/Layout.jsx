import { Outlet, NavLink } from "react-router-dom";
import "./Layout.css"; // Importa el archivo CSS

const Layout = () => {
  return (
    <div className="navbar"> {/* Usa la clase "navbar" */}
      <h1 className="title">CAJA DE COMENTARIOS AVAL BURÓ</h1> {/* Agrega la clase "title" */};
      <h4 className="subtitle">by Jack Narváez</h4>
      <nav>
        <ul>
          <li>
            <NavLink end to="/">Home</NavLink>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
};

export default Layout;

