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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M4 4C4 2.3431 5.3431 1 7 1L13.1716 1C13.9672 1 14.7303 1.3161 15.2929 1.8787L19.1213 5.7071C19.6839 6.2697 20 7.0328 20 7.8284L20 20C20 21.6569 18.6569 23 17 23L7 23C5.3431 23 4 21.6569 4 20L4 4Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M5 4C5 2.8954 5.8954 2 7 2L13.1716 2C13.702 2 14.2107 2.2107 14.5858 2.5858L18.4142 6.4142C18.7893 6.7893 19 7.298 19 7.8284L19 20C19 21.1046 18.1046 22 17 22L7 22C5.8954 22 5 21.1046 5 20L5 4ZM9 13C9 12.4477 9.4477 12 10 12L14 12C14.5523 12 15 12.4477 15 13L15 17C15 17.5523 14.5523 18 14 18L10 18C9.4477 18 9 17.5523 9 17L9 13Z" fill="none"/>
    </svg>
  )
}
