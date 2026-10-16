import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArchiveX({ size = 24, ...props }: IconProps) {
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
      <path d="M3 4L21 4C21.5523 4 22 4.4477 22 5L22 8C22 8.5523 21.5523 9 21 9L3 9C2.4477 9 2 8.5523 2 8L2 5C2 4.4477 2.4477 4 3 4Z" fill="currentColor" stroke="none"/>
      <path d="M2 4L22 4L22 9L2 9L2 4ZM4 9L4 20L20 20L20 9M10.2071 12.7071L13.7929 16.2929M13.7929 12.7071L10.2071 16.2929" fill="none"/>
    </svg>
  )
}
