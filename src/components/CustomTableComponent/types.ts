import React, { ComponentPropsWithoutRef } from "react"

export type SivTableData = {
  firstName?: string
  lastName?: string
  startDate?: string
  department?: string
  dateOfBirth?: string
  street?: string
  city?: string
  state?: string
  zipCode?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export type SivTableState = {
  employeesList: SivTableData[]
}

export type Column = {
  title?: string
  name: string
  width?: string
  isReference?: boolean
  collapse?: boolean
  disappearanceOrder?: number
  disableSorting?: boolean
  titleStyle?: React.CSSProperties
  columnStyle?: React.CSSProperties
}

export type SivTableProps = {
  height: string
  data: SivTableData[]
  columns?: Column[]
  title?: string
  noSearchBar?: boolean
}

export type SortingOption = {
  name: string
  type: "asc" | "desc"
}

export type MyButton = ComponentPropsWithoutRef<"button">

export type MinWidthProps = {
  text?: string
  fontfamily: string
  fontSize: number
  padding: number
  iconWidth: number
  fixedWidth: string
}

export type MinHeightProps = {
  fontfamily: string
  fontSize: number
  padding: number
  offset: number
  availableHeight: string
}
