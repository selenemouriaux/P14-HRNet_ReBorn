import { orderBy } from "lodash"
import { FONT_FAMILY_MAIN, FONT_SIZE_HEADINGS } from "./constants"
import {
  MinHeightProps,
  MinWidthProps,
  SivTableData,
  SortingOption,
} from "./types"

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

export function getMinWidth({
  text,
  fontfamily = FONT_FAMILY_MAIN,
  fontSize = FONT_SIZE_HEADINGS,
  padding = 20,
  iconWidth = 0,
  fixedWidth = "",
}: MinWidthProps): string | undefined {
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")

  if (!context || !text) return undefined

  context.font = `${fontSize}px ${fontfamily}`
  const metrics = context.measureText(text)

  return fixedWidth || `${Math.floor(metrics.width + padding + iconWidth)}px`
}

export function getPaginationItemsNbByHeight({
  fontfamily = FONT_FAMILY_MAIN,
  fontSize = FONT_SIZE_HEADINGS,
  padding = 6,
  availableHeight,
  offset = 100,
}: MinHeightProps): number {
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")

  if (!context || !availableHeight) return 30

  context.font = `${fontSize}px ${fontfamily}`
  const metrics = context.measureText("Hello, World!")

  const lineHeight =
    Math.abs(metrics.actualBoundingBoxAscent) +
    Math.abs(metrics.actualBoundingBoxDescent) +
    2 * padding

  console.log("available height : ", availableHeight)
  console.log("lineHeight : ", lineHeight)
  console.log("offset : ", offset)
  console.log(
    "nb de llignes : ",
    Math.floor((parseInt(availableHeight) - offset) / lineHeight)
  )

  return Math.floor((parseInt(availableHeight) - offset) / lineHeight)
}

// export function manageColumns()
// TODO : calculate how many cols to remove or add and returns a list of active columns to display, and a list of columns to send to the details component

// export function sortingIcon(name, sort) {}

export function getSizedReducedByScrollBarWidth(id: string): string {
  const container = document.createElement("div")
  document.body.appendChild(container)
  const element = document.getElementById(id)
  const width = element?.offsetWidth

  container.style.overflow = "scroll"
  container.style.width = "100px"
  container.style.height = "100px"

  const inner = document.createElement("div")
  container.appendChild(inner)
  inner.style.width = "100%"
  inner.style.height = "200px"

  const scrollbarWidth = container.offsetWidth - inner.offsetWidth
  const reducedWidhElement = width ? `${width - scrollbarWidth}px` : "100%"

  // console.log(
  //   `scroll width : ${scrollbarWidth}, reducedwidth : ${reducedWidhElement}`
  // )

  document.body.removeChild(container)

  return reducedWidhElement
}
