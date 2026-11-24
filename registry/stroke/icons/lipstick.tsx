import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Lipstick({ size = 24, ...props }: IconProps) {
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
      <path d="M16 14L16 6.0028C16 5.6241 15.7862 5.278 15.4476 5.1085L9.4475 2.1057C9.3086 2.0362 9.1554 2 9 2C8.4477 2 8 2.4477 8 3L8 14C8 14.5523 7.5523 15 7 15C6.4477 15 6 15.4477 6 16L6 20C6 21.1046 6.8954 22 8 22L16 22C17.1046 22 18 21.1046 18 20L18 16C18 15.4477 17.5523 15 17 15C16.4477 15 16 14.5523 16 14ZM16 11L8 11"/>
    </svg>
  )
}
