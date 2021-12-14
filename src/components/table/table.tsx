// @ts-nocheck
import React, { useMemo } from 'react'
import { useTable, useExpanded, useBlockLayout} from 'react-table'

import styles from './table.module.css'

interface Column {
  Header   : string,
  accessor?: string,
  width?: number,
  columns? : Column[]
}

interface Props {
  columns: Column[],
  data   : any
}

const expander = {
  // Make an expander cell
  Header: () => null, // No header
  id: 'expander', // It needs an ID
  width: 50,
  // @ts-ignore
  Cell: ({ row }) => (
    // Use Cell to render an expander for each row.
    // We can use the getToggleRowExpandedProps prop-getter
    // to build the expander.
    <span {...row.getToggleRowExpandedProps()}>
      {row.isExpanded ? '🔻' : '▶'}
    </span>
  ),
}

const Table = (props: Props) => {

  const columns = [expander, ...props.columns]

  const defaultColumn = useMemo(
    () => ({
      // When using the useFlexLayout:
      minWidth: 30, // minWidth is only used as a limit for resizing
      maxWidth: 200, // maxWidth is only used as a limit for resizing
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
    useBlockLayout,
  )

  return (
    <div className={ styles.tableContainer }>
      <div className={styles.table} key={ getTableProps().key } {...getTableProps()}>
        <div className={ styles.thead }>
          {headerGroups.map(headerGroup => (
            <div  className={ styles.trhead }>
              {headerGroup.headers.map(column => (
                <div {...column.getHeaderProps()} className={styles.th}>
                  {column.render('Header')}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div {...getTableBodyProps()} className={ styles.tbody }>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              // Use a React.Fragment here so the table markup is still valid
              <React.Fragment {...row.getRowProps()}>
                <div className={ styles.tr }>
                  {row.cells.map(cell => {
                    return (
                      <div {...cell.getCellProps()} className={ styles.td }>{cell.render('Cell')}</div>
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
    </div>
  )
}

export default Table
