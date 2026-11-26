import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlertDouble({ size = 24, ...props }: IconProps) {
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
      <path d="M9 5V15M15 5V15"/>
      <path d="M10 19C10 19.5523 9.552 20 9 20C8.448 20 8 19.5523 8 19C8 18.4477 8.448 18 9 18C9.552 18 10 18.4477 10 19ZM16 19C16 19.5523 15.552 20 15 20C14.448 20 14 19.5523 14 19C14 18.4477 14.448 18 15 18C15.552 18 16 18.4477 16 19Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
