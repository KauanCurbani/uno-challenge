import MainPage from "./presentation/pages/MainPage";
import { AppApolloProvider } from "./providers/apolloProvider";
import { ModalsProvider } from "./providers/modalsProvider";

function App() {
  return (
    <AppApolloProvider>
      <ModalsProvider>
        <MainPage />
      </ModalsProvider>
    </AppApolloProvider>
  );
}

export default App;
