import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GitJoin({ size = 24, ...props }: IconProps) {
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
      <path d="M12 16L12 11M5 8L5 11L19 11L19 8M5 2C6.6569 2 8 3.3432 8 5C8 6.6569 6.6569 8 5 8C3.3432 8 2 6.6569 2 5C2 3.3432 3.3432 2 5 2ZM19 2C20.6569 2 22 3.3432 22 5C22 6.6569 20.6569 8 19 8C17.3431 8 16 6.6569 16 5C16 3.3432 17.3431 2 19 2ZM12 16C13.6569 16 15 17.3431 15 19C15 20.6569 13.6569 22 12 22C10.3431 22 9 20.6569 9 19C9 17.3431 10.3431 16 12 16Z"/>
    </svg>
  )
}
