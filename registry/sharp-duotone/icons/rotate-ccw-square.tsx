import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RotateCcwSquare({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M15 10C15.552 10 16 10.45 16 11V22C16 22.55 15.552 23 15 23H4C3.448 23 3 22.55 3 22V11C3 10.45 3.448 10 4 10H15Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M14.003 1L15.37 2.46L14.526 3.25H19.999C20.551 3.25 20.999 3.7 20.999 4.25V10H18.999V5.25H14.528L15.398 6.07L14.031 7.52L11.315 4.98C11.146 4.82 11.015 4.45 10.988 4.2C11.03 3.99 11.166 3.66 11.315 3.52L14.003 1Z" fill="currentColor"/>
    </svg>
  )
}
