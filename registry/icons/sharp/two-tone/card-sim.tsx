import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CardSim({ size = 24, ...props }: IconProps) {
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
      <path d="M5 1L14 1C14.2652 1 14.5196 1.1054 14.7071 1.2929L19.7071 6.2929C19.8946 6.4804 20 6.7348 20 7L20 22C20 22.5523 19.5523 23 19 23L5 23C4.4477 23 4 22.5523 4 22L4 2C4 1.4477 4.4477 1 5 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M5 2L14 2L19 7L19 22L5 22L5 2ZM9 12L15 12L15 18L9 18L9 12Z" fill="none"/>
    </svg>
  )
}
