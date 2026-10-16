import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FileChartColumn({ size = 24, ...props }: IconProps) {
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
      <path d="M14 2L8 2C5.7909 2 4 3.7909 4 6L4 18C4 20.2091 5.7909 22 8 22L16 22C18.2091 22 20 20.2091 20 18L20 8L14 2ZM14 2L14 5C14 6.6569 15.3431 8 17 8L20 8M8 18L8 14M12 18L12 15M16 18L16 12" fill="none"/>
    </svg>
  )
}
