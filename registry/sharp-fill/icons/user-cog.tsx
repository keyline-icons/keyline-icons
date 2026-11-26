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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M11 22H2C1.44772 22 1 21.5523 1 21V19C1 15.134 4.13402 12 8 12H11V22ZM9 2C11.2092 2 13 3.79082 13 6C13 8.20918 11.2092 10 9 10C6.79094 10 5 8.20921 5 6C5 3.79079 6.79094 2 9 2Z" fill="currentColor" stroke="none"/>
      <path d="M20.6667 17C20.6667 18.4728 19.4728 19.6667 18 19.6667C16.5272 19.6667 15.3333 18.4728 15.3333 17C15.3333 15.5272 16.5272 14.3333 18 14.3333C19.4728 14.3333 20.6667 15.5272 20.6667 17ZM20.99 17L23 17M20.1142 19.1142L21.5355 20.5355M18 19.99L18 22M15.8858 19.1142L14.4645 20.5355M15.01 17L13 17M15.8858 14.8858L14.4645 13.4645M18 14.01L18 12M20.1142 14.8858L21.5355 13.4645"/>
    </svg>
  )
}
