import "./App.css";
import { ReactTerminal } from "react-terminal";

function App() {
	const commands = {
		echo: (...args) => args.join(" "),
		ls: () => fetch("https://p.seanbehan.ca/list").then((res) => res.text()),
		paste: (...args) =>
			fetch("https://p.seanbehan.ca", {
				method: "POST",
				body: args.join(" "),
			}).then((res) => res.text()),
	};
	return (
		<ReactTerminal
			id="terminal"
			prompt={"$"}
			welcomeMessage={"Sean's Pastebin"}
			showControlButtons={false}
			showControlBar={false}
			commands={commands}
			theme={"dracula"}
		/>
	);
}

export default App;
