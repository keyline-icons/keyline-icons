import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Sprint({ size = 24, ...props }: IconProps) {
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
      <path d="M2.5615 21.1725L6.5 18.4999L7 16L7.1608 15.1961M19.6838 12.2721L19 12.5L16 13.5001L15 9.5L9 8.5L6 11.5L5.7071 11.7929M10.7 20.4L11 20L14 16L10 13.5L14.5 9.5L14.5615 9.4453"/>
      <path d="M21.1213 2.8787C21.6631 3.4205 22 4.1718 22 5C22 6.6569 20.6569 8 19 8C17.3431 8 16 6.6569 16 5C16 3.3431 17.3431 2 19 2C19.8282 2 20.5795 2.3369 21.1213 2.8787Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
