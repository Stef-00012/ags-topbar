import app from "ags/gtk4/app";
import { Astal, Gtk, type Gdk } from "ags/gtk4";
import { execAsync } from "ags/process";
import { createPoll } from "ags/time";
import { diskUsage } from "@/util/systemStats";

export default async function Bar(gdkmonitor: Gdk.Monitor) {
	const time = createPoll("", 1000, "date");
	const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

	// const url = new URL("https://jsonplaceholder.typicode.com/todos/1")

	// fetch(url).then(r => r.json()).then(console.log).catch(console.error)

	return (
		<window
			visible
			name="bar"
			class="Bar"
			gdkmonitor={gdkmonitor}
			exclusivity={Astal.Exclusivity.EXCLUSIVE}
			anchor={TOP | LEFT | RIGHT}
			application={app}
		>
			<centerbox cssName="centerbox">
				<button
					$type="start"
					onClicked={() => execAsync("echo hello").then(console.log)}
					hexpand
					halign={Gtk.Align.CENTER}
				>
					<label label="Welcome to AGS!" />
				</button>

				<label $type="center" label={diskUsage(d => d.totalSize)} />

				<menubutton $type="end" hexpand halign={Gtk.Align.CENTER}>
					<label label={time} />
					<popover>
						<Gtk.Calendar />
					</popover>
				</menubutton>
			</centerbox>
		</window>
	);
}
