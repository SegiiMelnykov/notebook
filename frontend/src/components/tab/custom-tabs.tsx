import { Box, Tab, Tabs } from "@mui/material";
import React from "react";

type Props = {
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  value: number;
  tabs: {
    index: number;
    value: string;
  }[];
  children: React.ReactNode;
  ariaLabel: string;
};

export default function CustomTabs({
  handleChange,
  value,
  tabs,
  children,
  ariaLabel,
}: Props) {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label={ariaLabel}
          indicatorColor="primary"
          textColor="primary"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.index}
              label={tab.value}
              value={tab.index}
              {...a11yProps(tab.index)}
            />
          ))}
        </Tabs>
      </Box>
      {children}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
