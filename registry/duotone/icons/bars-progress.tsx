import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BarsProgress({ size = 24, ...props }: IconProps) {
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
      <path d="M4 2L20 2C21.1046 2 22 2.8954 22 4L22 8C22 9.1046 21.1046 10 20 10L4 10C2.8954 10 2 9.1046 2 8L2 4C2 2.8954 2.8954 2 4 2ZM4 14L20 14C21.1046 14 22 14.8954 22 16L22 20C22 21.1046 21.1046 22 20 22L4 22C2.8954 22 2 21.1046 2 20L2 16C2 14.8954 2.8954 14 4 14Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M4 2L16 2L16 10L4 10C2.8954 10 2 9.1046 2 8L2 4C2 2.8954 2.8954 2 4 2ZM4 14L11 14L11 22L4 22C2.8954 22 2 21.1046 2 20L2 16C2 14.8954 2.8954 14 4 14Z" fill="currentColor"/>
    </svg>
  )
}
