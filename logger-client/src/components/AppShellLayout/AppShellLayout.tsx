import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  NavLink,
} from "@mantine/core";
import { Link, Outlet } from "react-router-dom";

const AppShellLayout = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [active, setActive] = useState(0);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          {" "}
          <Text>Dashboard</Text>
          <Navbar.Section>
            <NavLink defaultOpened label="Računi">
              <NavLink
                active={active === 0}
                label="By customer"
                component={Link}
                to=""
                onClick={() => setActive(0)}
              />
              <NavLink
                active={active === 1}
                label="Unpaid"
                component={Link}
                to={"unpaid"}
                onClick={() => setActive(1)}
              />
            </NavLink>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={50} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text>LOGGER</Text>
          </div>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  );
};

export default AppShellLayout;
