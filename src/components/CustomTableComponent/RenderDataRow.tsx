import { Cell } from "./styles"
import { SivTableData } from "./types"

const formatIfDate = (
  value: Date | string,
  locale: string,
  options: Intl.DateTimeFormatOptions
) => {
  if (!(value instanceof Date)) return value
  return new Intl.DateTimeFormat(locale, options).format(value)
}

const highlightMatch = (value: string, query: string) => {
  const text = String(value)
  if (!query) return text

  // Normalize both the text and the query to ensure accents are handled correctly
  const normalizedText = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  const normalizedQuery = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

  // Escape special characters in the query
  const escapedQuery = normalizedQuery.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")

  // Split the normalized text based on the normalized and escaped query
  const parts = normalizedText.split(new RegExp(`(${escapedQuery})`, "gi"))

  // Reconstruct the original text with highlights
  return (
    <>
      {parts.map((part, index) => {
        const originalPart = text.slice(
          normalizedText.indexOf(part),
          normalizedText.indexOf(part) + part.length
        )
        return part.toLowerCase() === normalizedQuery.toLowerCase() ? (
          <span key={index} style={{ backgroundColor: "#92AD19" }}>
            {originalPart}
          </span>
        ) : (
          originalPart
        )
      })}
    </>
  )
}

type DataRowProps = {
  dataRow: SivTableData
  index: number
  dataNames: string[]
  locale?: string
  options?: Intl.DateTimeFormatOptions
  query: string
}

const RenderDataRow = ({
  dataRow,
  index,
  dataNames,
  locale = "fr-FR",
  options = {
    // weekday: "long",
    // year: "numeric",
    // month: "long",
    // day: "numeric",
  },
  query,
}: DataRowProps) => (
  <tr key={`line-${index}`}>
    {Object.values(dataRow).map((value, idx) => (
      <Cell key={`${dataNames[idx]}-${index}`}>
        {highlightMatch(formatIfDate(value, locale, options), query)}
      </Cell>
    ))}
  </tr>
)

export default RenderDataRow
