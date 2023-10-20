import "./App.css";
import { ReactTerminal } from "react-terminal";

function App() {
	const commands = {
		echo: (...args) => args.join(" "),
		ls: () => fetch("https://p.seanbehan.ca/list").then((res) => res.text()),
		paste: async (...args) => {
			let body = "";
			if (args[0] !== "") {
				body = args.join(" ");
				return await fetch("https://p.seanbehan.ca", {
					method: "POST",
					body,
				}).then((res) => res.text());
			} else {
				const dialog = document.createElement("dialog");
				const textarea = document.createElement("textarea");
				textarea.placeholder = "Hit shift+enter when done";
				textarea.addEventListener("keyup", async (event) => {
					if (
						event.shiftKey &&
						(event.keyCode === 13 || event.key === "Enter")
					) {
						dialog.remove();
						body = textarea.value;
						await fetch("https://p.seanbehan.ca", {
							method: "POST",
							body,
						}).then((res) => res.text());
					}
				});
				dialog.appendChild(textarea);
				document.body.appendChild(dialog);
				dialog.show();
			}
		},
	};
	return (
		<ReactTerminal
			prompt={"$"}
			showControlButtons={false}
			showControlBar={false}
			commands={commands}
			theme={"dracula"}
		/>
	);
}

export default App;
