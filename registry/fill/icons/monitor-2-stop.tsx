import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Monitor2Stop({ size = 24, ...props }: IconProps) {
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
      <path d="M5 2L19 2C21.2092 2 23 3.7908 23 6L23 14C23 16.2092 21.2092 18 19 18L5 18C2.7908 18 1 16.2092 1 14L1 6C1 3.7908 2.7908 2 5 2ZM10 6C8.8954 6 8 6.8954 8 8L8 12C8 13.1046 8.8954 14 10 14L14 14C15.1046 14 16 13.1046 16 12L16 8C16 6.8954 15.1046 6 14 6L10 6Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M12 17L12 21M8 21L16 21" fill="none"/>
    </svg>
  )
}
