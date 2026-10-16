import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Headphones({ size = 24, ...props }: IconProps) {
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
      <path d="M2 12C2 10.343146 3.343146 9 5 9L5 9C6.656854 9 8 10.343146 8 12L8 19C8 20.656854 6.656854 22 5 22L5 22C3.343146 22 2 20.656854 2 19ZM16 12C16 10.343146 17.343146 9 19 9L19 9C20.656854 9 22 10.343146 22 12L22 19C22 20.656854 20.656854 22 19 22L19 22C17.343146 22 16 20.656854 16 19Z" fill="currentColor" stroke="none"/>
      <path d="M3 12C3 7.029437 7.029437 3 12 3C16.970563 3 21 7.029437 21 12"/>
    </svg>
  )
}
