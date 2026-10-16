import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SubtitlesOff({ size = 24, ...props }: IconProps) {
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
      <path d="M19.8708 19.8708C19.5885 19.9565 19.295 20 19 20L5 20C3.3431 20 2 18.6569 2 17L2 7C2 5.6786 2.8646 4.5128 4.1292 4.1292M9.6569 4L19 4C20.6569 4 22 5.3431 22 7L22 16.3431M6 10L8 10M6 14L12 14M2 2L22 22"/>
    </svg>
  )
}
