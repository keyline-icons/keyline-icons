import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Sailboat({ size = 24, ...props }: IconProps) {
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
      <path d="M3.0019 16L20.9981 16C21.8542 16 22.3145 17.0058 21.7548 17.6537L19.7948 19.9224C18.6551 21.2417 16.9979 22 15.2545 22L8.7455 22C7.0021 22 5.3449 21.2417 4.2052 19.9224L2.2452 17.6537C1.6855 17.0058 2.1458 16 3.0019 16ZM12.9049 2.2076L18.8503 10.4133C19.3294 11.0744 18.857 12 18.0406 12L12 12L12 2.5009C12 2.0162 12.6205 1.8151 12.9049 2.2076ZM12 5L6.7071 10.2929C6.0771 10.9229 6.5233 12 7.4142 12L12 12M12 12L12 16" fill="none"/>
    </svg>
  )
}
