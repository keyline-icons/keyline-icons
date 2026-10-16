import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function DiagramPredecessor({ size = 24, ...props }: IconProps) {
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
      <path d="M4 15L11 15C12.1046 15 13 15.8954 13 17L13 20C13 21.1046 12.1046 22 11 22L4 22C2.8954 22 2 21.1046 2 20L2 17C2 15.8954 2.8954 15 4 15ZM4 2L20 2C21.1046 2 22 2.8954 22 4L22 7C22 8.1046 21.1046 9 20 9L4 9C2.8954 9 2 8.1046 2 7L2 4C2 2.8954 2.8954 2 4 2Z" fill="currentColor" stroke="none"/>
      <path d="M12 18.5L17 18.5C17.5523 18.5 18 18.0523 18 17.5L18 12M16 14L18 12L20 14" fill="none"/>
    </svg>
  )
}
