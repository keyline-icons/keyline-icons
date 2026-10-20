import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Monitor2Cog({ size = 24, ...props }: IconProps) {
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
      <path d="M10 3L5 3C3.3431 3 2 4.3431 2 6L2 14C2 15.6569 3.3431 17 5 17L19 17C20.2713 17 21.4046 16.1986 21.8284 15M12 17L12 21M8 21L16 21M20.6667 7C20.6667 8.4728 19.4728 9.6667 18 9.6667C16.5272 9.6667 15.3333 8.4728 15.3333 7C15.3333 5.5272 16.5272 4.3333 18 4.3333C19.4728 4.3333 20.6667 5.5272 20.6667 7ZM21.5417 7L22 7M20.5043 9.5043L20.8284 9.8284M18 10.5417L18 11M15.4957 9.5043L15.1716 9.8284M14.4583 7L14 7M15.4957 4.4957L15.1716 4.1716M18 3.4583L18 3M20.5043 4.4957L20.8284 4.1716" fill="none"/>
    </svg>
  )
}
