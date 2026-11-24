import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Whistle({ size = 24, ...props }: IconProps) {
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
      <path d="M15 5L15 7L15 8M9 9.5C10.3807 9.5 11.5 10.6193 11.5 12C11.5 13.3807 10.3807 14.5 9 14.5C7.6193 14.5 6.5 13.3807 6.5 12C6.5 10.6193 7.6193 9.5 9 9.5ZM15 5L22 5L22 9L15.9826 11.5072C15.9942 11.6712 16 11.8356 16 12C16 15.866 12.866 19 9 19C5.134 19 2 15.866 2 12C2 8.134 5.134 5 9 5Z" fill="none"/>
    </svg>
  )
}
