import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TableCellsSplit({ size = 24, ...props }: IconProps) {
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
      <path d="M3 9L21 9L21 15L3 15L3 9ZM6.5 10L6.5 14L8.5 14L8.5 10ZM11 10L11 14L13 14L13 10ZM15.5 10L15.5 14L17.5 14L17.5 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M3 3L21 3L21 21L3 21L3 3ZM12 3L12 9M12 15L12 21M3 9L21 9M3 15L21 15"/>
    </svg>
  )
}
