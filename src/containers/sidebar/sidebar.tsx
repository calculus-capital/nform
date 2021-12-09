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
            <Menu.List.Item>
              <a className={styles.sidebarLink} href="/inventory">🌟 Create ...</a>
            </Menu.List.Item>
            <Menu.List.Item active>
              <a className={styles.sidebarLink} href="/">💵 Cash Flow</a>
            </Menu.List.Item>
          </Menu.List>
          <Menu.List title="Trade">
            <Menu.List.Item>
              <a className={styles.sidebarLink} href="/procurement">📦 Procurement</a>
            </Menu.List.Item>
            <Menu.List.Item>
              <a className={styles.sidebarLink} href="/sales">🤝 Sales</a>
            </Menu.List.Item>
            <Menu.List.Item>
              <a className={styles.sidebarLink} href="/log">🗒️ Log</a>
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
              <a className={styles.sidebarLink} href="/ledger">📒 Ledger</a>
            </Menu.List.Item>
          </Menu.List>
          <Menu.List title="Management">
            <Menu.List.Item>
              <a className={styles.sidebarLink} href="/network">🏭 Vendors</a>
            </Menu.List.Item>
            <Menu.List.Item>
              <a className={styles.sidebarLink} href="/utilities">🟪 Tools</a>
            </Menu.List.Item>
            <Menu.List.Item>
              <a className={styles.sidebarLink} href="/audit">👁️ Audit</a>
            </Menu.List.Item>
          </Menu.List>
          <Menu.List title="Other">
            <Menu.List.Item>
              <a className={styles.sidebarLink} href="/settings">⚙️ Settings</a>
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
