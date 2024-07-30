import { Cell } from "./styles"
import { SivTableData } from "./types"

const formatIfDate = (
  value: Date | string,
  locale: string = "fr-FR",
  options: Intl.DateTimeFormatOptions = {
    // weekday: "long",
    // year: "numeric",
    // month: "long",
    // day: "numeric",
  }
) => {
  if (!(value instanceof Date)) return value
  return new Intl.DateTimeFormat(locale, options).format(value)
}

const RenderDataRow = (
  dataRow: SivTableData,
  index: number,
  dataNames: string[],
  locale?: string,
  options?: Intl.DateTimeFormatOptions
) => (
  <tr key={`line-${index}`}>
    {Object.values(dataRow).map((value, idx) => (
      <Cell key={`${dataNames[idx]}-${index}`}>
        {formatIfDate(value, locale, options)}
      </Cell>
    ))}
  </tr>
)

export default RenderDataRow
