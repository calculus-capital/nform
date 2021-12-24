import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import { Menu, Section, Dropdown } from 'react-bulma-components'

import logo from "../../assets/logo.png";
import 'bulma/css/bulma.min.css';
import styles from './sidebar.module.css'
import { Button, Modal, Form } from 'react-bulma-components'
import { Grid, Cell } from 'styled-css-grid';

const Sidebar = () => {
  const location = useLocation()
  const [newItem, setNewItem] = useState(false)

  const s = useMediaQuery({ query: '(max-width:641px)' })

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
          <Menu.List title={s ? "" : "Dashboards"}>
            <Menu.List.Item active={location.pathname === "/create"}>
              <a className={styles.sidebarLink} href="#" onClick={() => setNewItem(true)}>{s ? "🟢" : "🟢 New"}</a>
            </Menu.List.Item>
            <Menu.List.Item active={location.pathname === "/cashflow"}>
              <Link className={styles.sidebarLink} to="/cashflow">{s ? "🌊" : "🌊 Cash Flow"}</Link>
            </Menu.List.Item>
            <Menu.List.Item active={location.pathname === "/"}>
              <Link className={styles.sidebarLink} to="/">{s ? "💵" : "💵 FinOps"}</Link>
            </Menu.List.Item>
          </Menu.List>
          <Menu.List title={s ? "" : "Finance"}>
            <Menu.List.Item active={location.pathname === "/credit"}>
              <Link className={styles.sidebarLink} to="/credit">{s ? "📉" : "📉 Credit"}</Link>
            </Menu.List.Item>
            <Menu.List.Item active={location.pathname === "/receivables"}>
              <Link className={styles.sidebarLink} to="/receivables">{s ? "📥" : "📥 Receivables"}</Link>
            </Menu.List.Item>
            <Menu.List.Item active={location.pathname === "/payables"}>
              <Link className={styles.sidebarLink} to="/payables">{s ? "📤" : "📤 Payables"}</Link>
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
          <Menu.List title={s ? "" : "Audit"}>
            <Menu.List.Item active={location.pathname === "/inventoryLog"}>
              <Link className={styles.sidebarLink} to="/inventoryLog">{s ? "🏬" : "🏬 Inventory"}</Link>
            </Menu.List.Item>
            <Menu.List.Item active={location.pathname === "/ledger"}>
              <Link className={styles.sidebarLink} to="/ledger">{s ? "📒" : "📒 Ledger"}</Link>
            </Menu.List.Item>
          </Menu.List>
          <Menu.List title={s ? "" : "Management"}>
          <Menu.List.Item active={location.pathname === "/network"}>
              <Link className={styles.sidebarLink} to="/network">{s ? "🏭" : "🏭 Partners"}</Link>
            </Menu.List.Item>
            <Menu.List.Item active={location.pathname === "/lenders"}>
              <Link className={styles.sidebarLink} to="/lenders">{s ? "🏦" : "🏦 Lenders"}</Link>
            </Menu.List.Item>
            <Menu.List.Item active={location.pathname === "/utilities"}>
              <Link className={styles.sidebarLink} to="/utilities">{s ? "🟪" : "🟪 Compliance"}</Link>
            </Menu.List.Item>
          </Menu.List>
          <Menu.List title={s ? "" : "Other"}>
            <Menu.List.Item active={location.pathname === "/settings"}>
              <Link className={styles.sidebarLink} to="/settings">{s ? "⚙️" : "⚙️ Settings"}</Link>
            </Menu.List.Item>
          </Menu.List>
        </Menu>
      </Section>
      <NewModal></NewModal>
    </div>
  )
}

export default Sidebar
