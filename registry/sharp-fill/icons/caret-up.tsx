import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CaretUp({ size = 24, ...props }: IconProps) {
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
      <path d="M11.544 6.2587L5.0727 17.2159C4.8674 17.5635 5.1213 18 5.5287 18L18.4713 18C18.8787 18 19.1326 17.5635 18.9273 17.2159L12.456 6.2587C12.2523 5.9138 11.7477 5.9138 11.544 6.2587Z" fill="currentColor" stroke="none"/>
      <path d="M12 6L5 18L19 18L12 6Z"/>
    </svg>
  )
}
