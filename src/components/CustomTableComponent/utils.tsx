import { orderBy } from "lodash"
import { SivTableData, SortingOption } from "./types"

export function updateSort(
  sortingOptions: SortingOption[],
  name: string
): SortingOption[] {
  console.log(sortingOptions)
  let newOption = true
  sortingOptions.map((obj) => {
    if (obj.name === name) {
      obj.type = obj.type === "asc" ? "desc" : "asc"
      newOption = false
    }
  })
  if (newOption) {
    sortingOptions.push({ name: name, type: "asc" })
    sortingOptions = sortingOptions.slice(-2)
  }
  return sortingOptions
}

export function sortingData(
  data: SivTableData[],
  sortingOptions: SortingOption[]
) {
  sortingOptions = sortingOptions.slice(-2)
  if (data.length)
    return orderBy(
      data,
      sortingOptions.map(({ name }) => name),
      sortingOptions.map(({ type }) => type)
    )
  return data
}

const datePattern = /^\d{4}-\d{1,2}-\d{1,2}$|^\d{1,2}\/\d{1,2}\/\d{4}$/

const isDate = (dateStr: string): boolean => {
  const date = new Date(dateStr)
  return !Number.isNaN(date) && datePattern.test(dateStr)
}

export function makeDatesGreatAgain(data: SivTableData[]) {
  return data.map((item) => {
    const newItem = { ...item }
    Object.keys(newItem).forEach((key) => {
      if (isDate(newItem[key])) {
        newItem[key] = new Date(newItem[key])
      }
    })
    return newItem
  })
}

// export function sortingIcon(name, sort) {}
