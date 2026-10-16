import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Wind({ size = 24, ...props }: IconProps) {
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
      <path d="M2 6L12 6C13.1046 6 14 5.1046 14 4C14 2.8954 13.1046 2 12 2C11.4696 2 10.9609 2.2107 10.5858 2.5858M6 12L20 12C21.1046 12 22 11.1046 22 10C22 8.8954 21.1046 8 20 8C19.4696 8 18.9609 8.2107 18.5858 8.5858M2 18L15 18C16.1046 18 17 18.8954 17 20C17 21.1046 16.1046 22 15 22C14.4696 22 13.9609 21.7893 13.5858 21.4142"/>
    </svg>
  )
}
