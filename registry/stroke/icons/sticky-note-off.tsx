import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function StickyNoteOff({ size = 24, ...props }: IconProps) {
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
      <path d="M3.8787 3.8787C3.3161 4.4413 3 5.2044 3 6L3 18C3 19.6569 4.3431 21 6 21L18 21C18.7956 21 19.5587 20.6839 20.1213 20.1213M8.6569 3L15 3L21 9L21 15.3431M15 3L15 6C15 7.6569 16.3431 9 18 9L21 9M2 2L22 22"/>
    </svg>
  )
}
