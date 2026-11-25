import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ImageWrapRight({ size = 24, ...props }: IconProps) {
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
      <path d="M13 7L19 7C20.1046 7 21 7.8954 21 9L21 15C21 16.1046 20.1046 17 19 17L13 17C11.8954 17 11 16.1046 11 15L11 9C11 7.8954 11.8954 7 13 7ZM3 3H21M3 21H21M3 9H7M3 15H7"/>
    </svg>
  )
}
