import { orderBy } from "lodash"
import { Cell } from "./styles"

const formatIfDate = (
  value,
  locale = "fr-FR",
  options = {
    // weekday: "long",
    // year: "numeric",
    // month: "long",
    // day: "numeric",
  }
) => {
  if (!(value instanceof Date)) return value
  return new Intl.DateTimeFormat(locale, options).format(value)
}

export const RenderDataRow = (dataRow, index, dataNames, locale, options) => (
  <tr key={`line-${index}`}>
    {Object.values(dataRow).map((value, idx) => (
      <Cell key={`${dataNames[idx]}-${index}`}>
        {formatIfDate(value, locale, options)}
      </Cell>
    ))}
  </tr>
)

export function updateSort(sort, name) {
  let newSort = true
  sort.map((obj) => {
    if (obj.name === name) {
      obj.type = obj.type === "asc" ? "desc" : "asc"
      newSort = false
    }
  })
  if (newSort) {
    sort.push({ name: name, type: "asc" })
    sort = sort.slice(-2)
  }
  return sort
}

export function sortingData(data, sort) {
  sort = sort.slice(-2)
  if (data.length)
    return orderBy(
      data,
      sort.map(({ name }) => name),
      sort.map(({ type }) => type)
    )
  return data
}

const datePattern = /^\d{4}-\d{1,2}-\d{1,2}$|^\d{1,2}\/\d{1,2}\/\d{4}$/

const isDate = (dateStr) => {
  const date = new Date(dateStr)
  return !isNaN(date) && datePattern.test(dateStr)
}

export function makeDatesGreatAgain(data) {
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

export function sortingIcon(name, sort) {}
