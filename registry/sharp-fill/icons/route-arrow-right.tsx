import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RouteArrowRight({ size = 24, ...props }: IconProps) {
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
      <path d="M6 15C8.209 15 10 16.791 10 19C10 21.209 8.209 23 6 23C3.791 23 2 21.209 2 19C2 16.791 3.791 15 6 15ZM14.475 1.149C14.769 0.967 15.137 0.951 15.447 1.105L21.447 4.105C21.786 4.275 22 4.621 22 5C22 5.379 21.786 5.725 21.447 5.895L15.447 8.895C15.137 9.049 14.769 9.033 14.475 8.851C14.18 8.668 14 8.347 14 8V2C14 1.653 14.18 1.332 14.475 1.149Z" fill="currentColor" stroke="none"/>
      <path d="M15 5H10.5C8.567 5 7 6.567 7 8.5C7 10.433 8.567 12 10.5 12H14.5C16.433 12 18 13.567 18 15.5C18 17.433 16.433 19 14.5 19H9"/>
    </svg>
  )
}
