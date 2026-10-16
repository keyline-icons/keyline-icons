import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function DiagramSuccessor({ size = 24, ...props }: IconProps) {
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
      <path d="M4 2L11 2C12.1046 2 13 2.8954 13 4L13 7C13 8.1046 12.1046 9 11 9L4 9C2.8954 9 2 8.1046 2 7L2 4C2 2.8954 2.8954 2 4 2ZM4 15L20 15C21.1046 15 22 15.8954 22 17L22 20C22 21.1046 21.1046 22 20 22L4 22C2.8954 22 2 21.1046 2 20L2 17C2 15.8954 2.8954 15 4 15Z" fill="currentColor" stroke="none"/>
      <path d="M12 5.5L17 5.5C17.5523 5.5 18 5.9477 18 6.5L18 12M20 10L18 12L16 10" fill="none"/>
    </svg>
  )
}
