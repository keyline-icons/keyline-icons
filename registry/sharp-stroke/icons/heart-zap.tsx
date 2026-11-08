import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HeartZap({ size = 24, ...props }: IconProps) {
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
      <path d="M14.664 3.11L14 3.34C13.284 3.6 12.616 3.99 12 4.5C10.843 3.55 9.5 3 8 3C4.686 3 2 5.57 2 8.75C2 13.75 7.438 17.1 12 21C15.145 18.31 18.705 15.89 20.614 13L20.911 12.55M21.293 2.71L18 6H22L18.707 9.29"/>
    </svg>
  )
}
