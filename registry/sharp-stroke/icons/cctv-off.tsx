import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CctvOff({ size = 24, ...props }: IconProps) {
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
      <path d="M12.8937 12.8937L4.47 9.4903L5.9147 5.9147M8.7904 3.6861L17.2913 7.1207L15.6178 11.2628M16.5421 8.9751L21.0001 8.6191L18.6905 14.3355M6.788 10.4269L6.788 17L3 17M3 12L3 22M1.7071 1.7071L22.2929 22.2929"/>
    </svg>
  )
}
