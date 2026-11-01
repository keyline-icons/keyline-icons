import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Desk({ size = 24, ...props }: IconProps) {
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
      <path d="M7 9L4.6404 9C3.812 9 3.1404 8.3284 3.1404 7.5C3.1404 7.3773 3.1554 7.2551 3.1852 7.1362L4.4352 2.1359C4.6024 1.4683 5.2022 1 5.8904 1L8.1096 1C8.7979 1.0001 9.3978 1.4685 9.5648 2.1362L10.8148 7.1362C10.8446 7.2551 10.8596 7.3773 10.8596 7.5C10.8596 8.3284 10.188 9 9.3596 9L7 9Z" fill="currentColor" stroke="none"/>
      <path d="M2 12L22 12M7 8L7 12L4 12L4 22M20 12L20 22M20 19L4 19" fill="none"/>
    </svg>
  )
}
