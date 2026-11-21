import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FilmScan({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2V1H14V23H12V22H3C2.4477 22 2 21.5523 2 21V3C2 2.4477 2.4477 2 3 2H12ZM4 6.5V8.5H7V6.5ZM4 11V13H7V11ZM4 15.5V17.5H7V15.5ZM9 4V11H12V4ZM9 13V20H12V13Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M17 2V11M17 22V13M21 21V17M21 15V9M21 7V3"/>
    </svg>
  )
}
