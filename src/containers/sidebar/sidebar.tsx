import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { Menu, Section, Dropdown } from 'react-bulma-components'

import logo from "../../assets/logo.png";
import 'bulma/css/bulma.min.css';
import styles from './sidebar.module.css'
import { Button, Modal, Form } from 'react-bulma-components'
import { Grid, Cell } from 'styled-css-grid';

const Sidebar = () => {
  const location = useLocation()
  const [newItem, setNewItem] = useState(false)

  const NewModal = () => {
    return (
      <Modal show={newItem} onClose={() => setNewItem(false)}>
        <Modal.Content className={styles.newItemModalContent}>
          <div className={styles.newItemModalTitle}>
            <h1>Create New</h1>
            <p className={styles.newItemModalClose} onClick={() => setNewItem(false)}>❌</p>
          </div>
          <Grid columns={3}>
            <Cell className={styles.newItemCell}>
              <p className={styles.newItemClass}>Trade</p>
            </Cell>
            <Cell className={styles.newItemCell}>
              <a className={styles.newItemOption}>📥 Purchase Order</a>
            </Cell>
            <Cell className={styles.newItemCell}>
              <a className={styles.newItemOption}>📤 Sale</a>
            </Cell>
          </Grid>
          <Grid columns={3}>
            <Cell className={styles.newItemCell}>
              <p className={styles.newItemClass}>Inventory</p>
            </Cell>
            <Cell className={styles.newItemCell}>
              <a className={styles.newItemOption}>📦 Production</a>
            </Cell>
            <Cell className={styles.newItemCell}>
              <a className={styles.newItemOption}>📦 Consumption</a>
            </Cell>
          </Grid>
          <Grid columns={3}>
            <Cell className={styles.newItemCell}>
              <p className={styles.newItemClass}>Finance</p>
            </Cell>
            <Cell className={styles.newItemCell}>
              <a className={styles.newItemOption}>💵 Payment</a>
            </Cell>
            <Cell className={styles.newItemCell}>
              <a className={styles.newItemOption}>💵 Collection</a>
            </Cell>
          </Grid>
          <Grid columns={3}>
            <Cell className={styles.newItemCell}></Cell>
            <Cell className={styles.newItemCell}>
              <a className={styles.newItemOption}>💵 Credit</a>
            </Cell>
            <Cell className={styles.newItemCell}>
              <a className={styles.newItemOption}>💵 Repayment</a>
            </Cell>
          </Grid>
          <Grid columns={3}>
            <Cell className={styles.newItemCell}>
              <p className={styles.newItemClass}>Partners</p>
            </Cell>
            <Cell className={styles.newItemCell}>
              <a className={styles.newItemOption}>🏭 Vendor</a>
            </Cell>
            <Cell className={styles.newItemCell}>
              <a className={styles.newItemOption}>🏭 Distributor</a>
            </Cell>
          </Grid>
          <Grid columns={3}>
            <Cell className={styles.newItemCell}></Cell>
            <Cell className={styles.newItemCell}>
              <a className={styles.newItemOption}>🏭 Supplier</a>
            </Cell>
            <Cell className={styles.newItemCell}>
              <a className={styles.newItemOption}>💰 Credit Line</a>
            </Cell>
          </Grid>
        </Modal.Content>
      </Modal>
    )
  }

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
              <a className={styles.sidebarLink} href="#" onClick={() => setNewItem(true)}>🟢 New</a>
            </Menu.List.Item>
            <Menu.List.Item active={location.pathname === "/"}>
              <Link className={styles.sidebarLink} to="/">💵 Operations</Link>
            </Menu.List.Item>
            <Menu.List.Item active={location.pathname === "/cashflow"}>
              <Link className={styles.sidebarLink} to="/cashflow">🌊 Cash Flow</Link>
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
      <NewModal></NewModal>
    </div>
  )
}

export default Sidebar
