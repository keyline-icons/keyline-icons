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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M11 3L2 3L2 17L22 17L22 14M12 17L12 21M7 21L17 21M20.6667 7C20.6667 8.4728 19.4728 9.6667 18 9.6667C16.5272 9.6667 15.3333 8.4728 15.3333 7C15.3333 5.5272 16.5272 4.3333 18 4.3333C19.4728 4.3333 20.6667 5.5272 20.6667 7ZM20.99 7L23 7M20.1142 9.1142L21.5355 10.5355M18 9.99L18 12M15.8858 9.1142L14.4645 10.5355M15.01 7L13 7M15.8858 4.8858L14.4645 3.4645M18 4.01L18 2M20.1142 4.8858L21.5355 3.4645" fill="none"/>
    </svg>
  )
}
