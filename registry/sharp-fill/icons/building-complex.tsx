import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BuildingComplex({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M17 4.5934L17 10L22 10C22.5523 10 23 10.4477 23 11L23 21C23 21.5523 22.5523 22 22 22L4 22C3.4477 22 3 21.5523 3 21L3 8.7457L1.5704 9.1712L1 7.2542L3.7148 6.4463L8.7147 4.9583L15.7147 2.8749C15.7206 2.8731 15.7265 2.8714 15.7324 2.8698L18.8637 2L19.3989 3.927L17 4.5934ZM13.5 20L17.5 20L17.5 16L13.5 16L13.5 20ZM5 8.1505L5 14L8 14L8 7.2576L5 8.1505ZM5 16L5 20L8 20L8 16L5 16ZM10 6.6624L10 10L15 10L15 5.1743L10 6.6624Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
