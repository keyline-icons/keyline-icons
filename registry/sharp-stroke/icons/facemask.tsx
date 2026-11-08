import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Facemask({ size = 24, ...props }: IconProps) {
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
      <path d="M7.091 14.5H2V8.5H8L12 6L16.222 8.5H22V14.5H16.909M6 8.5L6.513 12.44C6.734 14.13 7.508 15.66 8.669 16.68C10.643 18.43 13.357 18.43 15.331 16.68C16.493 15.66 17.266 14.13 17.487 12.44L18 8.5M12 10V15"/>
    </svg>
  )
}
