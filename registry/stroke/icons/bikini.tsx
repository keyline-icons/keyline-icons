import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Bikini({ size = 24, ...props }: IconProps) {
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
      <path d="M7 2L7 6.7639L12 9M7 6.7639C6.3637 7.333 6 8.1463 6 9C6 10.6568 7.3431 12 9 12C10.6568 12 12 10.6568 12 9C12 10.6568 13.3432 12 15 12C16.6569 12 18 10.6568 18 9C18 8.1463 17.6363 7.333 17 6.7639L12 9M17 6.7639L17 2M8 17L16 17C16.5523 17 17 17.4477 17 18L17 18.0858C17 18.351 16.8946 18.6054 16.7071 18.7929L13.7929 21.7071C13.6054 21.8946 13.351 22 13.0858 22L10.9142 22C10.649 22 10.3946 21.8946 10.2071 21.7071L7.2929 18.7929C7.1054 18.6054 7 18.351 7 18.0858L7 18C7 17.4477 7.4477 17 8 17Z"/>
    </svg>
  )
}
