import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ZodiacLeo({ size = 24, ...props }: IconProps) {
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
      <path d="M9.7979 15.3279C9.9317 15.7042 10 16.1006 10 16.5C10 18.433 8.433 20 6.5 20C4.567 20 3 18.433 3 16.5C3 14.567 4.567 13 6.5 13C7.9811 13 9.3019 13.9323 9.7979 15.3279ZM9.7979 15.3279L7.7887 9.6744C7.5976 9.1368 7.5 8.5705 7.5 8C7.5 5.2386 9.7386 3 12.5 3C15.2614 3 17.5 5.2386 17.5 8C17.5 8.4572 17.4373 8.9123 17.3136 9.3525L15.1118 17.1885C15.0376 17.4526 15 17.7257 15 18C15 19.6569 16.3431 21 18 21C19.6569 21 21 19.6569 21 18C21 17.65 20.9388 17.3028 20.8191 16.9739L20.5796 16.3159" fill="none"/>
    </svg>
  )
}
