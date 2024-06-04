import { orderBy } from "lodash"
import { Cell } from "./styles"

export const RenderDataRow = (dataRow, index, dataNames) => (
  <tr key={`line-${index}`}>
    {Object.values(dataRow).map((value, idx) => (
      <Cell key={`${dataNames[idx]}-${index}`}>{value}</Cell>
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

export function sortingIcon(name, sort) {}
