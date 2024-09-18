import MainPage from "./presentation/pages/MainPage";
import { AppApolloProvider } from "./providers/apolloProvider";
import { ModalsProvider } from "./providers/modalsProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AppApolloProvider>
      <ModalsProvider>
        <MainPage />
        <ToastContainer />
      </ModalsProvider>
    </AppApolloProvider>
  );
}

export default App;
