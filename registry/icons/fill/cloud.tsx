import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Cloud({ size = 24, ...props }: IconProps) {
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
      <path d="M6 20L18 20C20.5784 20 22.734 18.0393 22.9776 15.4724C23.2212 12.9055 21.4729 10.5743 18.9405 10.0893C18.4833 6.6052 15.5139 4 12 4C8.4861 4 5.5167 6.6052 5.0595 10.0893C2.5271 10.5743 0.7788 12.9055 1.0224 15.4724C1.266 18.0393 3.4216 20 6 20Z" fill="currentColor"/>
    </svg>
  )
}
