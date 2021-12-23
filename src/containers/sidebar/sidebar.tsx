import React from 'react'
import { Link, useLocation } from 'react-router-dom'

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
                <Dropdown label="⚡️ New" className={ styles.create } color="green">
                  <Dropdown.Item renderAs="a" value="Order">📥 Purchase</Dropdown.Item>
                  <Dropdown.Item renderAs="a" value="Sale">📤 Sale</Dropdown.Item>
                  <Dropdown.Divider></Dropdown.Divider>
                  <Dropdown.Item renderAs="a" value="Supplier">📦 Production</Dropdown.Item>
                  <Dropdown.Item renderAs="a" value="Supplier">📦 Consumption</Dropdown.Item>
                  <Dropdown.Divider></Dropdown.Divider>
                  <Dropdown.Item renderAs="a" value="Supplier">🏭 Supplier</Dropdown.Item>
                  <Dropdown.Item renderAs="a" value="Vendor">🏭 Vendor</Dropdown.Item>
                  <Dropdown.Divider></Dropdown.Divider>
                  <Dropdown.Item renderAs="a" value="Vendor">💵 Payment</Dropdown.Item>
                  <Dropdown.Item renderAs="a" value="Vendor">💵 Repayment</Dropdown.Item>
                </Dropdown>
              </div>
            </Menu.List.Item>
            <Menu.List.Item active={location.pathname === "/"}>
              <Link className={styles.sidebarLink} to="/">💵 Cash Flow</Link>
            </Menu.List.Item>
          </Menu.List>
          <Menu.List title="Finance">
            <Menu.List.Item active={location.pathname === "/credit"}>
              <Link className={styles.sidebarLink} to="/credit">📉 Credit</Link>
            </Menu.List.Item>
            <Menu.List.Item active={location.pathname === "/receivables"}>
              <Link className={styles.sidebarLink} to="/receivables">📥 Receivables</Link>
            </Menu.List.Item>
            <Menu.List.Item active={location.pathname === "/payables"}>
              <Link className={styles.sidebarLink} to="/payables">📤 Payables</Link>
            </Menu.List.Item>
            {/* <Menu.List.Item active={location.pathname === "/taxes"}>
              <Link className={styles.sidebarLink} to="/taxes">🟩 Taxes</Link>
            </Menu.List.Item> */}
          </Menu.List>
          {/* <Menu.List title="Operations">
            <Menu.List.Item active={location.pathname === "/inventory"}>
              <Link className={styles.sidebarLink} to="/inventory">🏬 Inventory</Link>
            </Menu.List.Item>
            <Menu.List.Item active={location.pathname === "/procurement"}>
              <Link className={styles.sidebarLink} to="/procurement">🚚 Procurement</Link>
            </Menu.List.Item>
            <Menu.List.Item active={location.pathname === "/fulfillment"}>
              <Link className={styles.sidebarLink} to="/fulfillment">🚢 Fulfillment</Link>
            </Menu.List.Item>
          </Menu.List> */}
          <Menu.List title="Audit">
            <Menu.List.Item active={location.pathname === "/inventoryLog"}>
              <Link className={styles.sidebarLink} to="/inventoryLog">🏬 Inventory</Link>
            </Menu.List.Item>
            <Menu.List.Item active={location.pathname === "/ledger"}>
              <Link className={styles.sidebarLink} to="/ledger">📒 Ledger</Link>
            </Menu.List.Item>
          </Menu.List>
          <Menu.List title="Management">
          <Menu.List.Item active={location.pathname === "/network"}>
              <Link className={styles.sidebarLink} to="/network">🏭 Partners</Link>
            </Menu.List.Item>
            <Menu.List.Item active={location.pathname === "/lenders"}>
              <Link className={styles.sidebarLink} to="/lenders">🏦 Lenders</Link>
            </Menu.List.Item>
            <Menu.List.Item active={location.pathname === "/utilities"}>
              <Link className={styles.sidebarLink} to="/utilities">🟪 Compliance</Link>
            </Menu.List.Item>
          </Menu.List>
          <Menu.List title="Other">
            <Menu.List.Item active={location.pathname === "/settings"}>
              <Link className={styles.sidebarLink} to="/settings">⚙️ Settings</Link>
            </Menu.List.Item>
          </Menu.List>
        </Menu>
      </Section>
    </div>
  )
}

export default Sidebar
