import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Filter({ size = 24, ...props }: IconProps) {
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
      <path d="M3 2L21 2C21.8451 2 22.3092 2.9833 21.7719 3.6357L15 11.8589L15 19C15 19.3788 14.786 19.725 14.4472 19.8944L10.4472 21.8944C9.7823 22.2269 9 21.7434 9 21L9 11.8589L2.2281 3.6357C1.6908 2.9833 2.1549 2 3 2Z" fill="currentColor"/>
    </svg>
  )
}
