import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { useAppContext } from "./hooks/useAppContext";

// components
import Navbar from "./components/Navbar";

// pages
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

// styles
import "./App.css";
import ThemeSelector from "./components/ThemeSelector";

function App() {
  const { authIsReady, user } = useAppContext();
  const nodeRef = useRef();
  const { mode } = useAppContext();

  // routes
  const routes = [
    {
      path: "/",
      name: "Home",
      Component: () => (user ? <Home mode={mode} /> : <Redirect to="/login" />)
    },
    {
      path: "/login",
      name: "About",
      Component: () => (!user ? <Login /> : <Redirect to="/" />)
    },
    {
      path: "/signup",
      name: "Contact",
      Component: () => (!user ? <Signup /> : <Redirect to="/" />)
    }
  ];
  return (
    <div className={`App ${mode}`}>
      <div className="dark:bg-gray-900 h-full relative">
        {authIsReady && (
          <Router>
            <Navbar />
            <ThemeSelector />
            {routes.map(({ path, Component }) => (
              <Route key={path} exact path={path}>
                {({ match }) => (
                  <CSSTransition
                    nodeRef={nodeRef}
                    in={match != null}
                    classNames="out-in"
                    timeout={300}
                    mountOnEnter={false}
                    unmountOnExit={true}
                  >
                    <div
                      ref={nodeRef}
                      className="absolute bg-white dark:bg-gray-900 z-0 w-full out-in"
                    >
                      <Component />
                    </div>
                  </CSSTransition>
                )}
              </Route>
            ))}
          </Router>
        )}
      </div>
    </div>
  );
}

export default App;
