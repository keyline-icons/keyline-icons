import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Recycle({ size = 24, ...props }: IconProps) {
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
      <path d="M7.4793 7.4945L9.7855 3.5C10.9402 1.5 13.827 1.5 14.9817 3.5L17.2879 7.4945M13.8086 6.5622L17.2879 7.4945L18.2201 4.0152" strokeOpacity="0.4"/>
      <path d="M19.2879 10.9586L21.5941 14.953C22.7488 16.953 21.3054 19.453 18.996 19.453L14.3836 19.453M16.9306 16.906L14.3836 19.453L16.9306 22M10.3836 19.453L5.7712 19.453C3.4618 19.453 2.0184 16.953 3.1731 14.953L5.4793 10.9586M6.4116 14.4378L5.4793 10.9586L2 11.8908"/>
    </svg>
  )
}
