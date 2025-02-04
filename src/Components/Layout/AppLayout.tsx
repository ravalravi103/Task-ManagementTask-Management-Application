import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Route, Routes } from "react-router-dom";
import { Suspense, useState } from "react";
import AppBarComponent from "./AppBar/AppBar";
import AppDrawerComponent from "./Drawer/Drawer";

const LazyTaskForm = React.lazy(() => import('../HOC/TaskFormLogic').then(module => ({
	default: module.default(TaskForm),
})));

const TaskForm = React.lazy(() => import('../TaskForm/TaskForm'));

const tabs: TabItem[] = [
	{
		label: "Create Tasks",
		icon: <TaskAltIcon />,
		path: "/create-tasks",
		component: LazyTaskForm,
	},
	{
		label: "View Tasks",
		icon: <AssignmentIcon />,
		path: "/view-tasks",
		component: React.lazy(() => import("../TaskList/TaskList")),
	},
];

interface AppLayoutProps {
	darkMode: boolean;
	changeMode: () => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({ darkMode, changeMode }) => {
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBarComponent
				darkMode={darkMode}
				changeMode={changeMode}
				open={open}
				handleDrawerOpen={handleDrawerOpen}
			/>
			<AppDrawerComponent
				handleDrawerClose={() => handleDrawerClose()}
				open={open}
				tabs={tabs}
				theme={theme}></AppDrawerComponent>

			<Box
				component="main"
				sx={{
					p: 3,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					width: open ? "calc(100vw - 255px)" : "calc(100vw - 80px)"
				}}
			>

				<Suspense fallback={<div>Loading...</div>}>
					<Routes>
						{tabs.map((tab) => (
							<Route
								key={tab.path}
								path={tab.path}
								element={<tab.component />}
							/>
						))}
					</Routes>
				</Suspense>
			</Box>
		</Box>
	);
};
export default AppLayout;
