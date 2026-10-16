import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FileZip({ size = 24, ...props }: IconProps) {
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
      <path d="M14 2L4 2L4 22L20 22L20 8L14 2ZM14 2L14 8L20 8M10 2L10 7M10 9L10 14M12 16C12 17.1046 11.1046 18 10 18C8.8954 18 8 17.1046 8 16C8 14.8954 8.8954 14 10 14C11.1046 14 12 14.8954 12 16Z" fill="none"/>
    </svg>
  )
}
