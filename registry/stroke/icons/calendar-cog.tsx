import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CalendarCog({ size = 24, ...props }: IconProps) {
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
      <path d="M10 21H6C4.34315 21 3 19.6569 3 18V8C3 6.34315 4.34315 5 6 5H18C19.6569 5 21 6.34315 21 8V10M7 11H11M8 3V7M16 3V7M19.6667 17C19.6667 18.4728 18.4728 19.6667 17 19.6667C15.5272 19.6667 14.3333 18.4728 14.3333 17C14.3333 15.5272 15.5272 14.3333 17 14.3333C18.4728 14.3333 19.6667 15.5272 19.6667 17ZM20.5417 17H21M19.5043 19.5043L19.8284 19.8284M17 20.5417V21M14.4957 19.5043L14.1716 19.8284M13.4583 17H13M14.4957 14.4957L14.1716 14.1716M17 13.4583V13M19.5043 14.4957L19.8284 14.1716"/>
    </svg>
  )
}
