import "./App.css";
import React, { useState } from "react";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";

function App() {
	const [terminalLineData, setTerminalLineData] = useState([
		<TerminalOutput>Welcome to Sean's Pastebin Terminal</TerminalOutput>,
	]);

	const appendTerminalLineData = (str) => {
		setTerminalLineData(
			<>
				{terminalLineData}
				<TerminalOutput>{str}</TerminalOutput>
			</>
		);
	};

	return (
		<Terminal
			name="React Pastebin Terminal"
			height="100vh"
			colorMode={ColorMode.Dark}
			onInput={async (terminalInput) => {
				console.log(`New terminal input received: '${terminalInput}'`);
				const args = terminalInput.split(" ");
				let data;
				switch (args[0]) {
					case "ls":
						data = await fetch("https://p.seanbehan.ca/list").then((res) =>
							res.text()
						);
						appendTerminalLineData(data);
						break;
					case "cat":
						data = await fetch(`https://p.seanbehan.ca/${args[1]}`).then(
							(res) => res.text()
						);
						appendTerminalLineData(data);
						break;
					case "help":
						appendTerminalLineData(
							"available commands: ls, cat, help, rm, clear"
						);
						break;
					case "rm":
						data = await Promise.all(
							args.slice(1).map((arg) =>
								fetch(`https://p.seanbehan.ca/${arg}`, {
									method: "DELETE",
								}).then((res) => res.text())
							)
						);
						console.log(data);
						appendTerminalLineData(data);
						break;
					case "clear":
						setTerminalLineData(<TerminalOutput></TerminalOutput>);
						break;
					default:
						appendTerminalLineData("command not found.");
				}
			}}
		>
			{terminalLineData}
		</Terminal>
	);
}

export default App;
