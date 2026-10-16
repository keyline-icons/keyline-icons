import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SmartphoneHorizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M1 15V9C1 6.23858 3.23858 4 6 4H18C20.7614 4 23 6.23858 23 9V15C23 17.7614 20.7614 20 18 20H6C3.23858 20 1 17.7614 1 15Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 10.5L6 13.5"/>
    </svg>
  )
}
