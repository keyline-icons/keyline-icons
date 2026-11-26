import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PuzzleOff({ size = 24, ...props }: IconProps) {
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
      <path d="M18 18L18 19C18 20.6569 16.6569 22 15 22L5 22C3.3431 22 2 20.6569 2 19L2 17.5C2 16.6716 2.6716 16 3.5 16L4 16C5.1046 16 6 15.1046 6 14C6 12.8954 5.1046 12 4 12L3.5 12C2.6716 12 2 11.3284 2 10.5L2 9C2 7.3431 3.3431 6 5 6L6 6ZM8.4898 2.2949C8.9558 2.1048 9.4656 2 10 2C12.2092 2 14 3.7908 14 6L15 6C16.6569 6 18 7.3431 18 9L18 10C20.2092 10 22 11.7908 22 14C22 14.5344 21.8952 15.0442 21.7051 15.5102C21.5542 15.8714 21.1977 16.1251 20.7819 16.1251C20.5058 16.1251 20.2558 16.0132 20.0748 15.8322L8.1678 3.9252C7.9868 3.7442 7.8749 3.4942 7.8749 3.2181C7.8749 2.8023 8.1286 2.4458 8.4898 2.2949Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M2 2L22 22"/>
    </svg>
  )
}
