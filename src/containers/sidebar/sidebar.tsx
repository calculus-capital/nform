import React from 'react'

import { Menu, Section } from 'react-bulma-components'

import logo from "../../assets/logo.png";
import 'bulma/css/bulma.min.css';
import styles from './sidebar.module.css'

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={logo} alt="logo"></img>
        <p>Calculus Capital</p>
      </div>
      <Section className={styles.menu}>
        <Menu>
          <Menu.List title="Dashboards">
            <Menu.List.Item active>
              <a className={styles.sidebarLink} href="/">💵 Cash Flow</a>
            </Menu.List.Item>
            <Menu.List.Item>
              <a className={styles.sidebarLink} href="/inventory">🌟 New</a>
            </Menu.List.Item>
          </Menu.List>
          <Menu.List title="Trade">
            <Menu.List.Item>
              <a className={styles.sidebarLink} href="/trade">📦 Procurement</a>
            </Menu.List.Item>
            <Menu.List.Item>
              <a className={styles.sidebarLink} href="/sales">🤝 Sales</a>
            </Menu.List.Item>
            <Menu.List.Item>
              <a className={styles.sidebarLink} href="/payables">🗒️ Log</a>
            </Menu.List.Item>
          </Menu.List>
          <Menu.List title="Finance">
            <Menu.List.Item>
              <a className={styles.sidebarLink} href="/receivables">➡️ Receivables</a>
            </Menu.List.Item>
            <Menu.List.Item>
              <a className={styles.sidebarLink} href="/payables">⬅️ Payables</a>
            </Menu.List.Item>
            <Menu.List.Item>
              <a className={styles.sidebarLink} href="/payables">📒 Ledger</a>
            </Menu.List.Item>
          </Menu.List>
          <Menu.List title="Help">
            <Menu.List.Item>
              <a className={styles.sidebarLink} href="/documentation">📕 Documentation</a>
            </Menu.List.Item>
            <Menu.List.Item>
              <a className={styles.sidebarLink} href="/support">💁 Support</a>
            </Menu.List.Item>
          </Menu.List>
        </Menu>
      </Section>
    </div>
  )
}

export default Sidebar
