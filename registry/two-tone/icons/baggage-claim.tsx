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
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 1C12.5523 1 13 1.448 13 2V3.057C17.4999 3.554 21 7.368 21 12V16H22C22.5523 16 23 16.448 23 17C23 17.552 22.5523 18 22 18H20.2314C20.7077 18.531 21 19.231 21 20C21 21.657 19.6569 23 18 23C16.3431 23 15 21.657 15 20C15 19.231 15.2923 18.531 15.7686 18H8.2314C8.7077 18.531 9 19.231 9 20C9 21.657 7.6568 23 6 23C4.3432 23 3 21.657 3 20C3 19.231 3.2923 18.531 3.7686 18H2C1.4477 18 1 17.552 1 17C1 16.448 1.4477 16 2 16H3V12C3 7.368 6.5001 3.554 11 3.057V2C11 1.448 11.4477 1 12 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 17H22M4 17V12C4 7.582 7.5817 4 12 4M12 4C16.4183 4 20 7.582 20 12V17M12 4V2M8 17V12.5C8 12.224 8.2239 12 8.5 12H10M10 12V8.5C10 8.224 10.2239 8 10.5 8H13.5C13.7761 8 14 8.224 14 8.5V12M10 12H14M16 17V12.5C16 12.224 15.7761 12 15.5 12H14M18 22C16.8954 22 16 21.105 16 20C16 18.895 16.8954 18 18 18C19.1046 18 20 18.895 20 20C20 21.105 19.1046 22 18 22ZM6 22C4.8954 22 4 21.105 4 20C4 18.895 4.8954 18 6 18C7.1046 18 8 18.895 8 20C8 21.105 7.1046 22 6 22Z"/>
    </svg>
  )
}
