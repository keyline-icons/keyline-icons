import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Stroller({ size = 24, ...props }: IconProps) {
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
      <path d="M20 9.099L20 10C20 12.7614 17.7614 15 15 15L7 15C4.2386 15 2 12.7614 2 10L2 9C2 8.4477 2.4477 8 3 8L18.1802 8L18.8586 4.6077C19.0456 3.6729 19.8664 3 20.8198 3L21 3C21.5523 3 22 3.4477 22 4C22 4.5523 21.5523 5 21 5L20.8198 5L20 9.099Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 9C1.9994 5.8872 3.8044 3.0566 6.6269 1.744C7.6834 1.2525 8.8348 0.9986 10 1C10.5523 1 11 1.4477 11 2L11 9C11 9.5523 10.5523 10 10 10L3 10C2.4477 10 2 9.5523 2 9Z" fill="currentColor" stroke="none"/>
      <path d="M9 20C9 21.1046 8.1046 22 7 22C5.8954 22 5 21.1046 5 20C5 18.8954 5.8954 18 7 18C8.1046 18 9 18.8954 9 20ZM17 20C17 21.1046 16.1046 22 15 22C13.8954 22 13 21.1046 13 20C13 18.8954 13.8954 18 15 18C16.1046 18 17 18.8954 17 20Z" fill="none"/>
    </svg>
  )
}
