import App from "client/App";
import { renderToString } from "react-dom/server";

export const renderApp = () => {
  const markup = renderToString(<App />);

  return {
    markup,
  };
};
