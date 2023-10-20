import "./App.css";
import { ReactTerminal } from "react-terminal";

function App() {
	let paste_response = "";
	const commands = {
		help: () => (
			<>
				{["echo", "ls", "geturl", "paste", "clear", "help"].map((item) => (
					<>
						{item}
						<br />
					</>
				))}
			</>
		),
		echo: (...args) => args.join(" "),
		ls: () => fetch("https://p.seanbehan.ca/list").then((res) => res.text()),
		geturl: async () => paste_response,
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
				textarea.cols = 30;
				textarea.rows = 20;
				textarea.addEventListener("keyup", async (event) => {
					if (
						event.shiftKey &&
						(event.keyCode === 13 || event.key === "Enter")
					) {
						dialog.remove();
						body = textarea.value;
						paste_response = await fetch("https://p.seanbehan.ca", {
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
