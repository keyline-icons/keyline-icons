import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Stethoscope({ size = 24, ...props }: IconProps) {
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
      <path d="M6.002 3H4.208C3.373 3 2.61 3.47 2.237 4.22C1.986 4.72 1.936 5.3 2.097 5.84L3.852 11.17C4.535 13.44 6.628 15 9.002 15M6.002 3L6.004 1M6.002 3L6.004 5M9.002 15C11.376 15 13.469 13.44 14.151 11.17L15.751 5.84C15.912 5.3 15.862 4.72 15.611 4.22C15.238 3.47 14.474 3 13.64 3H12.002M9.002 15V16.5C9.002 19.54 11.464 22 14.502 22C17.539 22 20.002 19.54 20.002 16.5V16M12.004 5L12.002 3L12.004 1M20.002 16C18.897 16 18.001 15.1 18.001 14C18.001 12.9 18.897 12 20.001 12C21.106 12 22.001 12.9 22.001 14C22.001 15.1 21.106 16 20.002 16Z"/>
    </svg>
  )
}
