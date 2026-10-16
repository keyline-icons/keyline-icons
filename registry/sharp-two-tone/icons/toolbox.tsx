import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Toolbox({ size = 24, ...props }: IconProps) {
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
      <path d="M5 7L19 7C19.2652 7 19.5196 7.1054 19.7071 7.2929L22.7071 10.2929C22.8946 10.4804 23 10.7348 23 11L23 21C23 21.5523 22.5523 22 22 22L2 22C1.4477 22 1 21.5523 1 21L1 11C1 10.7348 1.1054 10.4804 1.2929 10.2929L4.2929 7.2929C4.4804 7.1054 4.7348 7 5 7Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M5 8L19 8L22 11L22 21L2 21L2 11L5 8ZM2 14L22 14M8 11L8 17M16 11L16 17M8 8L8 3L16 3L16 8"/>
    </svg>
  )
}
