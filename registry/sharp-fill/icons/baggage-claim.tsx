import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BaggageClaim({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M13 9V11H11V9H13Z" fill="currentColor"/>
      <path d="M13 1V3.056L13.412 3.111L13.817 3.186C17.916 4.026 21 7.652 21 12V16H23V18H20.232L20.402 18.207L20.534 18.399C20.828 18.862 21 19.411 21 20C21 21.657 19.657 23 18 23C16.343 23 15 21.657 15 20C15 19.327 15.228 18.702 15.603 18.202L15.768 18H8.232L8.402 18.207L8.534 18.399C8.828 18.862 9 19.411 9 20C9 21.657 7.657 23 6 23C4.343 23 3 21.657 3 20C3 19.327 3.228 18.702 3.603 18.202L3.768 18H1V16H3V12C3 7.404 6.551 3.603 11 3.057V1H13ZM10 7C9.448 7 9 7.448 9 8V11H8C7.448 11 7 11.448 7 12V16H17V12C17 11.448 16.552 11 16 11H15V8C15 7.448 14.552 7 14 7H10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
