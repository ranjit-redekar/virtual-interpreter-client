import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux"; // Import Provider from react-redux
import store from "./store";

import ChatHome from "./components/ChatHome";
import Summary from "./components/Summary";
import "./index.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <nav className="p-4 bg-gray-800 text-white flex justify-between">
          <h1 className="text-lg font-bold">Language Interpreter</h1>
          <div className="space-x-4">
            <Link to="/" className="text-white">
              Chat
            </Link>
            <Link to="/summary" className="text-white">
              Summary
            </Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<ChatHome />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
