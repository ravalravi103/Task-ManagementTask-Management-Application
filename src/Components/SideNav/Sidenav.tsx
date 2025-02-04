import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Route, Routes, Link, useLocation } from "react-router-dom";
import { List } from "@mui/material";
import { Suspense, useState } from "react";
import AppBarComponent from "./AppBar/AppBar";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	variants: [
		{
			props: ({ open }) => open,
			style: {
				...openedMixin(theme),
				"& .MuiDrawer-paper": openedMixin(theme),
			},
		},
		{
			props: ({ open }) => !open,
			style: {
				...closedMixin(theme),
				"& .MuiDrawer-paper": closedMixin(theme),
			},
		},
	],
}));

const LazyTaskForm = React.lazy(() => import('../HOC/TaskFormLogic').then(module => ({
	default: module.default(TaskForm),
  })));
  
  const TaskForm = React.lazy(() => import('../TaskForm/TaskForm'));
  
interface TabItem {
	label: string;
	icon: React.ReactNode;
	path: string;
	component: React.LazyExoticComponent<React.ComponentType<any>>;
}

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

interface SideNavProps {
	darkMode: boolean;
	changeMode: () => void;
}

const SideNav: React.FC<SideNavProps> = ({ darkMode, changeMode }) => {
	const theme = useTheme();
	const location = useLocation();
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
			<Drawer variant="permanent" open={open}>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "rtl" ? (
							<ChevronRightIcon />
						) : (
							<ChevronLeftIcon />
						)}
					</IconButton>
				</DrawerHeader>
				<List>
					{tabs.map((tab) => {
						const isSelected = location.pathname === tab.path;
						return (
							<ListItem
								key={tab.label}
								disablePadding
								sx={{ display: "block" }}
							>
								<ListItemButton
									sx={[
										{
											minHeight: 48,
											px: 2.5,
											backgroundColor: isSelected ? "#1976d2" : "transparent",
											color: isSelected ? "white" : "inherit",
											"&:hover": !isSelected
												? {
														backgroundColor: "#f5f5f5",
												  }
												: {},
										},
										open
											? {
													justifyContent: "initial",
											  }
											: {
													justifyContent: "center",
											  },
									]}
									component={Link}
									to={tab.path}
								>
									<ListItemIcon
										sx={[
											{
												minWidth: 0,
												justifyContent: "center",
											},
											open
												? {
														mr: 3,
												  }
												: {
														mr: "auto",
												  },
										]}
									>
										{tab.icon}
									</ListItemIcon>
									<ListItemText
										primary={tab.label}
										sx={[
											open
												? {
														opacity: 1,
												  }
												: {
														opacity: 0,
												  },
										]}
									/>
								</ListItemButton>
							</ListItem>
						);
					})}
				</List>
			</Drawer>
			<Box
				component="main"
				sx={{
					p: 3,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					width: open ? "calc(100vw - 255px)" :"calc(100vw - 80px)"
				}}
			>
				<DrawerHeader />
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
export default SideNav;
