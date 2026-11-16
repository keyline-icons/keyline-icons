import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CarElectric({ size = 24, ...props }: IconProps) {
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
      <path d="M16.647 3.0107C16.987 3.0613 17.281 3.2842 17.419 3.6055L19.566 8.6055L18.647 9L19.605 8.7119L19.812 9.3965L21.333 9.9346C21.733 10.0758 22 10.4541 22 10.8779V20C22 20.5523 21.552 21 21 21H17.5C17.041 21 16.642 20.6874 16.53 20.2422L16.22 19H7.78L7.47 20.2422C7.358 20.6874 6.959 21 6.5 21H3C2.448 21 2 20.5523 2 20V10.8779C2 10.4541 2.267 10.0758 2.667 9.9346L4.188 9.3965L4.395 8.7119L5.35 8.999L4.433 8.6055L6.581 3.6055L6.649 3.4736C6.83 3.1822 7.15 3.0001 7.5 3H16.5L16.647 3.0107Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M5.352 9L5 10.1707L3 10.8775V20H6.5L7 18H17L17.5 20H21V10.8775L19 10.1707L18.648 9M5.352 9L7.5 4H16.5L18.648 9M5.352 9H2.5M18.648 9H21.5M13.293 7.7071L10 11H14L10.707 14.2929"/>
    </svg>
  )
}
