import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function StickyNotes({ size = 24, ...props }: IconProps) {
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
      <path d="M16 5L16.0001 2L2 2L2 16.0001L5 16" strokeOpacity="0.4"/>
      <path d="M16 14L20.5858 14L16 9.4142Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M8 7L16 7C16.2652 7 16.5196 7.1054 16.7071 7.2929L22.7071 13.2929C22.8946 13.4804 23 13.7348 23 14L23 22C23 22.5523 22.5523 23 22 23L8 23C7.4477 23 7 22.5523 7 22L7 8C7 7.4477 7.4477 7 8 7ZM16 14L20.5858 14L16 9.4142Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
