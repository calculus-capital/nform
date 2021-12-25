// @ts-nocheck
import React, { useMemo, useState } from "react"
import { useTable, useExpanded, useBlockLayout } from "react-table"
import { useMediaQuery } from "react-responsive"

import { Button, Modal } from "react-bulma-components"
import { Grid, Cell } from "styled-css-grid"

import styles from "./table.module.css"
import { string } from "fp-ts"

interface Column {
  Header: string
  accessor?: string
  width?: number
  columns?: Column[]
}

interface Props {
  title?: string
  columns: Column[]
  data: any
  expand?: boolean
  actions: string[]
  actionHandlers?: ((e: Event) => any)[]
  clickHandler?: (e: Event) => any
}

const expander = {
  // Make an expander cell
  Header: () => null, // No header
  id: "expander", // It needs an ID
  width: 50,
  // @ts-ignore
  Cell: ({ row }) => (
    // Use Cell to render an expander for each row.
    // We can use the getToggleRowExpandedProps prop-getter
    // to build the expander.
    <span {...row.getToggleRowExpandedProps()}>{row.isExpanded ? "🔻" : "▶"}</span>
  ),
}

const Table = (props: Props) => {
  const s = useMediaQuery({ query: "(max-width: 481px)" })
  const m = useMediaQuery({ query: "(max-width: 1100px)" })

  const columns = props.expand ? [expander, ...props.columns] : props.columns
  const [modal, setModal] = useState<Row<object>>(null)

  const defaultColumn = useMemo(
    () => ({
      // When using the useFlexLayout:
      minWidth: 30, // minWidth is only used as a limit for resizing
      maxWidth: 100, // maxWidth is only used as a limit for resizing
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    // @ts-ignore
    state: { expanded },
  } = useTable(
    {
      columns: columns,
      data: props.data,
      defaultColumn: defaultColumn,
      autoResetHiddenColumns: false,
    },
    useExpanded,
    useBlockLayout
  )

  const RowModal = () => {
    return (
      <Modal show={modal !== null} onClose={() => setModal(null)}>
        <Modal.Content className={styles.rowModalContent}>
          <div className={styles.rowModalTitle}>
            <h1>{props.title || props.columns[0].Header}</h1>
            <p className={styles.rowModalClose} onClick={() => setModal(null)}>
              ❌
            </p>
          </div>
          <Grid columns={1} rows={modal !== null ? modal.cells.length : 0} className={styles.rowModalEntry}>
            {modal !== null &&
              modal.cells.map(cell => {
                return (
                  <Cell width={1} height={1}>
                    <Grid columns={s ? 2 : 3} className={styles.rowModalRow}>
                      <Cell className={styles.rowModalHeader}>{cell.column.Header}</Cell>
                      <Cell className={styles.rowModalValue}>{cell.value}</Cell>
                      <Cell className={styles.rowModalValue} left>
                        <a className={styles.rowModalEdit} href="#">
                          edit
                        </a>
                      </Cell>
                    </Grid>
                  </Cell>
                )
              })}
          </Grid>
          <Grid
            // columns={props.actions ? "100px ".repeat(props.actions.length) : 0}
            columns={props.actions ? props.actions.length : 0}
            justifyContent="end"
            className={styles.rowModalActions}
          >
            {props.actions &&
              props.actions.map(action => {
                return (
                  <Cell width={1}>
                    <Button className={styles.rowModalAction}>{action}</Button>
                  </Cell>
                )
              })}
          </Grid>
        </Modal.Content>
      </Modal>
    )
  }

  return (
    <div className={styles.tableContainer}>
      <div className={styles.table} key={getTableProps().key} {...getTableProps()}>
        <div className={styles.thead}>
          {headerGroups.map(headerGroup => (
            <div className={styles.trhead}>
              {headerGroup.headers.map(column => (
                <div {...column.getHeaderProps()} className={styles.th}>
                  {column.render("Header")}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div {...getTableBodyProps()} className={styles.tbody}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              // Use a React.Fragment here so the table markup is still valid
              <React.Fragment {...row.getRowProps()}>
                <div
                  className={styles.tr}
                  onClick={(e: Event) => (props.clickHandler ? props.clickHandler(row) : setModal(row))}
                >
                  {row.cells.map(cell => {
                    return (
                      <div {...cell.getCellProps()} className={styles.td}>
                        {cell.render("Cell")}
                      </div>
                    )
                  })}
                </div>
                {/*
                    If the row is in an expanded state, render a row with a
                    column that fills the entire length of the table.
                  */}
                {/* @ts-ignore */}
                {row.isExpanded ? (
                  <div>
                    <div colSpan={visibleColumns.length}>
                      {/*
                          Inside it, call our renderRowSubComponent function. In reality,
                          you could pass whatever you want as props to
                          a component like this, including the entire
                          table instance. But for this example, we'll just
                          pass the row
                        */}
                      {/* {renderRowSubComponent({ row })} */}
                    </div>
                  </div>
                ) : null}
              </React.Fragment>
            )
          })}
        </div>
      </div>
      <RowModal></RowModal>
    </div>
  )
}

export default Table
