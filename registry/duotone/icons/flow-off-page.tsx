import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlowOffPage({ size = 24, ...props }: IconProps) {
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
      <path d="M5 5L19 5C20.6569 5 22 6.3431 22 8L22 11C22 11.6295 21.7036 12.2223 21.2 12.6L13.2 18.6C12.4889 19.1333 11.5111 19.1333 10.8 18.6L2.8 12.6C2.2964 12.2223 2 11.6295 2 11L2 8C2 6.3431 3.3431 5 5 5Z"/>
    </svg>
  )
}
