import { createGlobalStyle, ThemeProvider } from "styled-components";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { darkTheme } from "./theme";
import ToDoList from "./TodoList";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
  /* 여기에 글로벌 스타일 작성 */
`;

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <ToDoList />
      <ReactQueryDevtools initialIsOpen={true} />
    </ThemeProvider>
  );
}

export default App;
