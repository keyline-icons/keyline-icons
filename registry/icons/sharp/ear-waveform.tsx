import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function EarWaveform({ size = 24, ...props }: IconProps) {
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
      <path d="M4 10L4 9C4 5.134 7.134 2 11 2C14.866 2 18 5.134 18 9L18 10M11 22L10 22C8.3431 22 7 20.6569 7 19L7 18M13.5 10L13.5 9C13.5 7.6193 12.3807 6.5 11 6.5C9.6193 6.5 8.5 7.6193 8.5 9L8.5 11L8.5 12M12 14L12 15L12 18L12 19M16 12L16 13L16 20L16 21M20 14L20 15L20 18L20 19" fill="none"/>
    </svg>
  )
}
