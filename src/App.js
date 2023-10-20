import "./App.css";
import { ReactTerminal } from "react-terminal";

function App() {
	const commands = {
		echo: (...args) => args.join(" "),
		ls: () => fetch("https://p.seanbehan.ca/list").then((res) => res.text()),
	};
	return <ReactTerminal id="terminal" commands={commands} theme={"dracula"} />;
}

export default App;
