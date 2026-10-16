import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function StickyNoteX({ size = 24, ...props }: IconProps) {
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
      <path d="M6 2L15 2C15.2652 2 15.5196 2.1054 15.7071 2.2929L21.7071 8.2929C21.8946 8.4804 22 8.7348 22 9L22 11C22 11.5523 21.5523 12 21 12L15 12C13.3431 12 12 13.3431 12 15L12 21C12 21.5523 11.5523 22 11 22L6 22C3.7909 22 2 20.2091 2 18L2 6C2 3.7909 3.7909 2 6 2ZM15 6C15 7.6569 16.3431 9 18 9L19.5858 9L15 4.4142Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M15 15L21 21M21 15L15 21"/>
    </svg>
  )
}
