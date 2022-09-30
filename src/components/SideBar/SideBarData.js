import React from "react";
import GridViewIcon from "@mui/icons-material/GridView";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import SummarizeIcon from "@mui/icons-material/Summarize";
import GroupIcon from "@mui/icons-material/Group";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SettingsIcon from "@mui/icons-material/Settings";

export const SideBarData = [
  {
    title: "Dashboard",
    icon: <GridViewIcon />,
    link: "/dashboard",
  },
  {
    title: "Questionnaire",
    icon: <DynamicFormIcon />,
    link: "/questionnaire",
  },
  {
    title: "Report",
    icon: <SummarizeIcon />,
    link: "/results",
  },
  {
    title: "Patient",
    icon: <GroupIcon />,
    link: "/patient",
  },
  {
    title: "Analysis",
    icon: <AnalyticsIcon />,
    link: "/analysis",
  },
  {
    title: "Settings",
    icon: <SettingsIcon />,
    link: "/settings",
  },
];
