import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Thermometer({ size = 24, ...props }: IconProps) {
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
      <path d="M16.8787 2.8787C17.4413 2.3161 18.2044 2 19 2C20.6569 2 22 3.3431 22 5C22 5.7956 21.6839 6.5587 21.1213 7.1213L9.7781 18.4645C9.2155 19.0271 8.4525 19.3432 7.6568 19.3432C6 19.3432 4.6568 18 4.6568 16.3432C4.6568 15.5475 4.9729 14.7845 5.5355 14.2219L16.8787 2.8787ZM5.5355 18.4645L2 22L1.7071 22.2929M16.1716 3.5858L17.5858 5L17.8787 5.2929M13.3431 6.4142L14.7574 7.8284L15.0503 8.1213M10.5147 9.2426L11.9289 10.6569L12.2218 10.9497" fill="none"/>
    </svg>
  )
}
