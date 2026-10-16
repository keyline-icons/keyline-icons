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
      <path d="M20.8284 20.8284C20.0783 21.5786 19.0609 22 18 22L6 22C3.7909 22 2 20.2091 2 18L2 6C2 4.9391 2.4214 3.9217 3.1716 3.1716L20.8284 20.8284ZM7.9497 3.7071C7.7622 3.5196 7.6569 3.2652 7.6569 3C7.6569 2.4477 8.1046 2 8.6569 2L15 2C15.2652 2 15.5196 2.1054 15.7071 2.2929L21.7071 8.2929C21.8946 8.4804 22 8.7348 22 9L22 15.3431C22 15.8954 21.5523 16.3431 21 16.3431C20.7348 16.3431 20.4804 16.2378 20.2929 16.0503ZM15 6C15 7.6569 16.3431 9 18 9L19.5858 9L15 4.4142Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M2 2L22 22"/>
    </svg>
  )
}
