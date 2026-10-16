import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ToggleOff({ size = 24, ...props }: IconProps) {
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
      <path d="M2.5 5L21.5 5C22.3284 5 23 5.6716 23 6.5L23 17.5C23 18.3284 22.3284 19 21.5 19L2.5 19C1.6716 19 1 18.3284 1 17.5L1 6.5C1 5.6716 1.6716 5 2.5 5Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6.5 10L9.5 10C9.7761 10 10 10.2239 10 10.5L10 13.5C10 13.7761 9.7761 14 9.5 14L6.5 14C6.2239 14 6 13.7761 6 13.5L6 10.5C6 10.2239 6.2239 10 6.5 10Z"/>
    </svg>
  )
}
