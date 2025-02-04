import React from 'react'
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

interface TabItem {
    label: string;
    icon: React.ReactNode;
    path: string;
    component: React.LazyExoticComponent<React.ComponentType<any>>;
}

type ListItemButtonComponentProps = {
    tab: TabItem;
    isSelected: boolean;
    open: boolean
}

const SidebarListItem = ({ tab, isSelected, open }: ListItemButtonComponentProps) => {
    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}

export default SidebarListItem