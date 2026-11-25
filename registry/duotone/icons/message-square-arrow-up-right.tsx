import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MessageSquareArrowUpRight({ size = 24, ...props }: IconProps) {
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
      <path d="M2 13.5L2 6C2 3.7908 3.7908 2 6 2L18 2C20.2092 2 22 3.7908 22 6L22 14C22 16.2092 20.2092 18 18 18L7.4142 18L3.7071 21.7071C3.5196 21.8946 3.2652 22 3 22C2.4477 22 2 21.5523 2 21Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M9 7H14.4994C14.7756 7 15 7.22386 15 7.5V13M9 13L14.5 7.5"/>
    </svg>
  )
}
