import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlaskRound({ size = 24, ...props }: IconProps) {
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
      <path d="M9.5 1L14.5 1C15.0523 1 15.5 1.4477 15.5 2L15.5 7.8063C18.2529 9.1456 20 11.9386 20 15C20 19.4183 16.4183 23 12 23C7.5817 23 4 19.4183 4 15C4 11.9386 5.7471 9.1456 8.5 7.8063L8.5 2C8.5 1.4477 8.9477 1 9.5 1ZM10.5 3L10.5 8.4617C10.5 8.8761 10.2443 9.2477 9.8571 9.3957C7.5342 10.2839 6 12.5131 6 15L18 15C18 12.5131 16.4658 10.2839 14.1429 9.3957C13.7557 9.2477 13.5 8.8761 13.5 8.4617L13.5 3L10.5 3Z" fill="currentColor" stroke="none"/>
      <path d="M7 2L17 2" fill="none"/>
    </svg>
  )
}
