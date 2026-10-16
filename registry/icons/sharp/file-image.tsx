import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FileImage({ size = 24, ...props }: IconProps) {
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
      <path d="M14 2L4 2L4 22L20 22L20 8L14 2ZM14 2L14 8L20 8M4 18L9.9999 12.0001L20 17"/>
      <path d="M10.5 7C10.5 7.8284 9.8284 8.5 9 8.5C8.1716 8.5 7.5 7.8284 7.5 7C7.5 6.1716 8.1716 5.5 9 5.5C9.8284 5.5 10.5 6.1716 10.5 7Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
