export type SivTableData = {
  firstName?: string
  lastName?: string
  startDate?: string
  department?: string
  dateOfBirth?: string
  street?: string
  city?: string
  state?: string
  zipCode?: string
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
}

export type SivTableProps = {
  height?: string
  data: SivTableData[]
  columns?: Column[]
  title?: string
  nbItemsPerPage?: number
  noSearchBar?: boolean
}

export type SortingOption = {
  name: string
  type: "asc" | "desc"
}
