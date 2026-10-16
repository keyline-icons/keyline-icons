import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MusicNoteOff({ size = 24, ...props }: IconProps) {
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
      <path d="M10 18C10 20.2091 8.2091 22 6 22C3.7909 22 2 20.2091 2 18C2 15.7909 3.7909 14 6 14C8.2091 14 10 15.7909 10 18ZM19.6465 19.6465C19.1443 19.8736 18.5869 20 18 20C15.7909 20 14 18.2091 14 16C14 15.4131 14.1264 14.8557 14.3535 14.3535Z" fill="currentColor" stroke="none"/>
      <path d="M9 18L9 9M10.4202 4.7633L21 3L21 15.3431M2 2L22 22"/>
    </svg>
  )
}
