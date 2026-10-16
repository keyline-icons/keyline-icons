import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Milestone({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2L12 5M12 11L12 22M8 22L16 22" strokeOpacity="0.4"/>
      <path d="M5 4L16.7192 4C17.0865 4 17.4467 4.1011 17.7603 4.2923L21.0411 6.2923C21.6366 6.6554 22 7.3025 22 8C22 8.6975 21.6366 9.3446 21.0411 9.7077L17.7603 11.7077C17.4467 11.8989 17.0865 12 16.7192 12L5 12C3.3431 12 2 10.6569 2 9L2 7C2 5.3431 3.3431 4 5 4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
