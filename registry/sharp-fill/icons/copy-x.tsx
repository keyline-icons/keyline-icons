import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CopyX({ size = 24, ...props }: IconProps) {
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
      <path d="M16 5L16.0001 2L2 2L2 16.0001L5 16" fill="none"/>
      <path d="M8 7L22 7C22.5523 7 23 7.4477 23 8L23 22C23 22.5523 22.5523 23 22 23L8 23C7.4477 23 7 22.5523 7 22L7 8C7 7.4477 7.4477 7 8 7ZM16.4142 15L19 12.4142L17.5858 11L15 13.5858L12.4142 11L11 12.4142L13.5858 15L11 17.5858L12.4142 19L15 16.4142L17.5858 19L19 17.5858L16.4142 15Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
