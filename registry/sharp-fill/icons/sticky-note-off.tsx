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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M21.7071 21.7071C21.5196 21.8946 21.2652 22 21 22L3 22C2.4477 22 2 21.5523 2 21L2 3C2 2.7348 2.1054 2.4804 2.2929 2.2929L21.7071 21.7071ZM7.6569 2L15 2C15.2652 2 15.5196 2.1054 15.7071 2.2929L21.7071 8.2929C21.8946 8.4804 22 8.7348 22 9L22 16.3431L20 16.3431L7.6569 4ZM15 9L19.5858 9L15 4.4142Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M1.7071 1.7071L22.2929 22.2929"/>
    </svg>
  )
}
