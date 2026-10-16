import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CaretLeft({ size = 24, ...props }: IconProps) {
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
      <path d="M6.2587 12.456L17.2159 18.9273C17.5635 19.1326 18 18.8787 18 18.4713L18 5.5287C18 5.1213 17.5635 4.8674 17.2159 5.0727L6.2587 11.544C5.9138 11.7477 5.9138 12.2523 6.2587 12.456Z" fill="currentColor" stroke="none"/>
      <path d="M6 12L18 19L18 5L6 12Z"/>
    </svg>
  )
}
