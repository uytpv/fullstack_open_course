import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

const App = () => {
    const add = (event) => {
        event.preventDefault();
        return (
            <h1>Halo</h1>
        )
    }
}

export default App;
