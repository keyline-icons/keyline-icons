import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Broadcast({ size = 24, ...props }: IconProps) {
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
      <path d="M9.297 12.1135L8.7234 11.2943C8.2526 10.6219 8 9.8209 8 9C8 8.1791 8.2526 7.3781 8.7234 6.7057L9.297 5.8865M14.703 5.8865L15.2766 6.7057C15.7474 7.3781 16 8.1791 16 9C16 9.8209 15.7474 10.6219 15.2766 11.2943L14.703 12.1135M7.4585 15.6614L6.7085 15C4.9865 13.4813 4 11.296 4 9C4 6.704 4.9865 4.5187 6.7085 3L6.992 2.75M17.008 2.75L17.2915 3C19.0135 4.5187 20 6.704 20 9C20 11.296 19.0135 13.4813 17.2915 15L16.5415 15.6614M12 13L12 22"/>
      <path d="M13 9C13 9.5523 12.5523 10 12 10C11.4477 10 11 9.5523 11 9C11 8.4477 11.4477 8 12 8C12.5523 8 13 8.4477 13 9Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
