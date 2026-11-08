import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Mailbox({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M17 3C20.312 3 23 5.69 23 9V18C23 18.55 22.552 19 22 19H13V21H11V19H2C1.448 19 1 18.55 1 18V9C1 5.69 3.686 3 7 3H17Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M7 4H17C19.76 4 22 6.24 22 9V18H11M7 4C4.239 4 2 6.24 2 9V18H12M7 4C9.761 4 12 6.24 12 9V18M12 18V21M5 9H9"/>
    </svg>
  )
}
