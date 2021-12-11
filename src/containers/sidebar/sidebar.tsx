import React from 'react'
import { useLocation } from 'react-router-dom'

import { Menu, Section, Dropdown } from 'react-bulma-components'

import logo from "../../assets/logo.png";
import 'bulma/css/bulma.min.css';
import styles from './sidebar.module.css'

const Sidebar = () => {
  const location = useLocation()
  console.log(location.pathname)

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={logo} alt="logo"></img>
        <p>Calculus Capital</p>
      </div>
      <Section className={styles.menu}>
        <Menu>
          <Menu.List title="Dashboards">
            <Menu.List.Item active={location.pathname === "/create"}>
              <div className={styles.createContainer}>
                <Dropdown label="⭐ New" className={ styles.create } color="green">
                  <Dropdown.Item renderAs="a" value="Order"> Purchase Order</Dropdown.Item>
                  <Dropdown.Item renderAs="a" value="Sale">Sale</Dropdown.Item>
                  <Dropdown.Item renderAs="a" value="Invoice">Invoice</Dropdown.Item>
                  <Dropdown.Divider></Dropdown.Divider>
                  <Dropdown.Item renderAs="a" value="Supplier">Supplier</Dropdown.Item>
                  <Dropdown.Item renderAs="a" value="Vendor">Vendor</Dropdown.Item>
                  <Dropdown.Item renderAs="a" value="Supplier">Sales Channel</Dropdown.Item>
                </Dropdown>
              </div>
            </Menu.List.Item>
            <Menu.List.Item active={location.pathname === "/"}>
              <a className={styles.sidebarLink} href="/">💵 Cash Flow</a>
            </Menu.List.Item>
          </Menu.List>
          <Menu.List title="Trade">
            <Menu.List.Item active={location.pathname === "/procurement"}>
              <a className={styles.sidebarLink} href="/procurement">📦 Procurement</a>
            </Menu.List.Item>
            <Menu.List.Item active={location.pathname === "/sales"}>
              <a className={styles.sidebarLink} href="/sales">🤝 Sales</a>
            </Menu.List.Item>
            <Menu.List.Item active={location.pathname === "/log"}>
              <a className={styles.sidebarLink} href="/log">🗒️ Log</a>
            </Menu.List.Item>
          </Menu.List>
          <Menu.List title="Finance">
            <Menu.List.Item active={location.pathname === "/receivables"}>
              <a className={styles.sidebarLink} href="/receivables">➡️ Receivables</a>
            </Menu.List.Item>
            <Menu.List.Item active={location.pathname === "/payables"}>
              <a className={styles.sidebarLink} href="/payables">⬅️ Payables</a>
            </Menu.List.Item>
            <Menu.List.Item active={location.pathname === "/ledger"}>
              <a className={styles.sidebarLink} href="/ledger">📒 Ledger</a>
            </Menu.List.Item>
          </Menu.List>
          <Menu.List title="Management">
            <Menu.List.Item active={location.pathname === "/network"}>
              <a className={styles.sidebarLink} href="/network">🏭 Vendors</a>
            </Menu.List.Item>
            <Menu.List.Item active={location.pathname === "/utilities"}>
              <a className={styles.sidebarLink} href="/utilities">🟪 Tools</a>
            </Menu.List.Item>
            <Menu.List.Item active={location.pathname === "/audit"}>
              <a className={styles.sidebarLink} href="/audit">👁️ Audit</a>
            </Menu.List.Item>
          </Menu.List>
          <Menu.List title="Other">
            <Menu.List.Item active={location.pathname === "/settings"}>
              <a className={styles.sidebarLink} href="/settings">⚙️ Settings</a>
            </Menu.List.Item>
            <Menu.List.Item active={location.pathname === "/support"}>
              <a className={styles.sidebarLink} href="/support">💁 Support</a>
            </Menu.List.Item>
          </Menu.List>
        </Menu>
      </Section>
    </div>
  )
}

export default Sidebar
