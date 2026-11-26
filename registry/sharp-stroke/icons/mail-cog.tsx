import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MailCog({ size = 24, ...props }: IconProps) {
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
      <path d="M11 18L2 18L2 2L22 2L22 11M2 5L11.2929 9C11.7154 9.2817 12.2846 9.2817 12.7071 9L22 5M20.6667 18C20.6667 19.4728 19.4728 20.6667 18 20.6667C16.5272 20.6667 15.3333 19.4728 15.3333 18C15.3333 16.5272 16.5272 15.3333 18 15.3333C19.4728 15.3333 20.6667 16.5272 20.6667 18ZM20.99 18L23 18M20.1142 20.1142L21.5355 21.5355M18 20.99L18 23M15.8858 20.1142L14.4645 21.5355M15.01 18L13 18M15.8858 15.8858L14.4645 14.4645M18 15.01L18 13M20.1142 15.8858L21.5355 14.4645" fill="none"/>
    </svg>
  )
}
