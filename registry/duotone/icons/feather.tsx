import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Feather({ size = 24, ...props }: IconProps) {
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
      <path d="M4.7461 19.2539C4.4156 18.9236 4.2075 18.4906 4.156 18.0262L3.5578 12.6421C3.5494 12.5667 3.5452 12.4908 3.5452 12.4149C3.5452 11.8692 3.762 11.3459 4.1479 10.9601L11.2663 3.8416C12.4455 2.6624 14.0448 2 15.7123 2C19.1849 2 22 4.8151 22 8.2877C22 9.9552 21.3376 11.5545 20.1584 12.7337L16.5992 16.2929L13.0399 19.8521C12.6541 20.238 12.1308 20.4548 11.5851 20.4548C11.5092 20.4548 11.4333 20.4506 11.3579 20.4422L5.9738 19.844C5.5094 19.7925 5.0764 19.5844 4.7461 19.2539Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 21L15.7124 8.28764M9.73007 14.2699L15.694 15.7838M9.73007 14.2699L8.4142 8.10794" fill="none"/>
    </svg>
  )
}
