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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M7.1906 7.9945L9.7855 3.5C10.9402 1.5 13.827 1.5 14.9817 3.5L17.2879 7.4945M13.0674 6.3636L17.2879 7.4945L18.4187 3.274M18.9992 10.4586L21.5941 14.953C22.7488 16.953 21.3054 19.453 18.996 19.453L14.3836 19.453M17.2235 16.6131L14.3836 19.453L17.2235 22.2929M11.3836 19.453L5.7712 19.453C3.4618 19.453 2.0184 16.953 3.1731 14.953L5.4793 10.9586M6.6102 15.179L5.4793 10.9586L1.2588 12.0894"/>
    </svg>
  )
}
