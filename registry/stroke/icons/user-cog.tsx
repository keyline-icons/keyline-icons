import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function UserCog({ size = 24, ...props }: IconProps) {
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
      <path d="M9 3C10.6569 3 12 4.3431 12 6C12 7.6569 10.6569 9 9 9C7.3432 9 6 7.6569 6 6C6 4.3431 7.3432 3 9 3ZM10 21L3 21C2.4477 21 2 20.5523 2 20V19C2 15.6863 4.6863 13 8 13L10 13M20.6667 17C20.6667 18.4728 19.4728 19.6667 18 19.6667C16.5272 19.6667 15.3333 18.4728 15.3333 17C15.3333 15.5272 16.5272 14.3333 18 14.3333C19.4728 14.3333 20.6667 15.5272 20.6667 17ZM21.5417 17L22 17M20.5043 19.5043L20.8284 19.8284M18 20.5417L18 21M15.4957 19.5043L15.1716 19.8284M14.4583 17L14 17M15.4957 14.4957L15.1716 14.1716M18 13.4583L18 13M20.5043 14.4957L20.8284 14.1716"/>
    </svg>
  )
}
