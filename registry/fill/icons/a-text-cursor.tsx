import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ATextCursor({ size = 24, ...props }: IconProps) {
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
      <path d="M2 19L7 5L12 19M3.7857 14L10.2143 14M19 5.8C18.6667 5.35 17.6 4 16 4M19 5.8C19.3333 5.35 20.4 4 22 4M19 5.8L19 18.2M19 18.2C19.3333 18.65 20.4 20 22 20M19 18.2C18.6667 18.65 17.6 20 16 20" fill="none"/>
    </svg>
  )
}
