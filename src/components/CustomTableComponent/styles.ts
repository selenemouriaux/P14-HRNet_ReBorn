import styled, { css } from "styled-components"

const centeredXYtext = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

interface IconProps {
  size?: string
}
export const Icon = styled.img<IconProps>`
  width: ${(props) => props?.size || "20px"};
  height: ${(props) => props?.size || "20px"};
`

export const Wrapper = styled.div`
  box-sizing: border-box;
  font-family: inherit;
  color: inherit;
  position: relative;
  height: auto;

  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  justify-content: space-between;
  width: ${(props) => props.styles?.width || "100%"};
  background-color: ${(props) => props.styles?.backgroundColor || "#ececec"};
  border-radius: ${(props) => props.styles?.borderRadius || "10px"};
  ${(props) => {
    props.styles?.boxShadow &&
      css`
        box-shadow: ${props.styles.boxShadow};
      `
  }}
  margin: ${(props) => props.styles?.margin || "10px"};
  padding: ${(props) => props.styles?.padding || "10px"};
  border-radius: ${(props) => props.styles?.borderRadius || "20px"};

  & .title {
    background-color: ${(props) => props.styles?.titleBackgroundColor};
    border-radius: ${(props) => props.styles?.borderRadius || "10px"};
    width: 100%;
    font-weight: bold;
    font-size: large;
    text-align: ${(props) => props.styles?.titleAlign || "center"};
  }

  & .guide {
    min-width: 100px;
    background-color: ${(props) =>
      props.styles?.buttonBackgroundColor || "#fff"};
    border-radius: ${(props) => props.styles?.borderRadius || "10px"};
    font-weight: normal;
    font-size: 1rem;
    ${centeredXYtext};
    padding: ${(props) => props.styles?.buttonPadding || "10px"};
    margin-bottom: 10px;
  }
  & .right {
    margin-left: auto;
  }
  & .left {
    margin-right: auto;
  }
  & .searchField {
    height: 30px;
    padding: 0 10px;
    font-size: inherit;
    color: ${(props) => props.styles?.contrast || "inherit"};
    font-weight: bold;
  }
  & .searchButton {
    height: 34px;
    display: "block";
  }
  & .active {
    background-color: #5b7005;
    color: #d6e4dd;
  }
  & .big {
    padding: 10px;
    border: 2px solid #d6e4dd;
    border-radius: 10px;
    font-size: bolder;
  }
`

interface TableProps {
  height?: string
}

export const Table = styled.div<TableProps>`
  height: auto;
  & .bodyContainer {
    height: ${(props) => props.height || "30vh"};
    overflow-y: auto;
  }
  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
  }

  thead {
    z-index: 1;
    border-top: 1px solid black;
    border-bottom: 2px solid black;
    background-color: #f2f2f2;
    & > tr > {
      &:not(:first-child) {
        border-left: 1px solid black;
      }
    }
  }
  tr {
    &:nth-child(odd) {
      background-color: darken(#f2f2f2, 10%);
    }
    &:nth-child(even) {
      background-color: #f2f2f2;
    }
  }
  tbody {
    position: relative;
    top: 20px;
  }
`

interface ColumnTitleProps {
  $isMainCriterion?: boolean
  $isSecondCriterion?: boolean
  width?: string
}

export const ColumnTitle = styled.th<ColumnTitleProps>`
  cursor: pointer;
  padding: 20px 10px;
  white-space: nowrap;
  background-color: ${(props) =>
    props.$isMainCriterion
      ? "rgba(109, 133, 16, 0.5)"
      : props.$isSecondCriterion
      ? "rgba(147, 172, 24, 0.5)"
      : "unset"};
  & > img {
    margin: auto;
    padding: 0 10px;
  }
`
export const Cell = styled.td`
  padding: 6px 10px;
`
