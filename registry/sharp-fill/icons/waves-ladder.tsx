import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function WavesLadder({ size = 24, ...props }: IconProps) {
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
      <path d="M8 15L8 4C8 2.8954 7.1046 2 6 2C4.8954 2 4 2.8954 4 4L4 5M16 15L16 4C16 2.8954 15.1046 2 14 2C12.8954 2 12 2.8954 12 4L12 5M8 8L16 8M8 12L16 12M1.8258 20.2551L2 20C3.821 17.3333 5.179 17.3333 7 20C8.821 22.6667 10.179 22.6667 12 20C13.821 17.3333 15.179 17.3333 17 20C18.821 22.6667 20.179 22.6667 22 20L22.1742 19.7449" fill="none"/>
    </svg>
  )
}
