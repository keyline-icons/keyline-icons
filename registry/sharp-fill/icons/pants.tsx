import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Pants({ size = 24, ...props }: IconProps) {
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
      <path d="M19.792 8.1L21.979 20.91C22.071 21.45 21.711 21.97 21.172 22.07L16.079 22.98C15.589 23.07 15.106 22.78 14.95 22.31L12.023 13.4L8.947 22.32C8.784 22.8 8.296 23.08 7.805 22.98L2.806 21.97C2.277 21.87 1.927 21.36 2.018 20.82L4.203 8.1H19.792ZM17.616 1C17.896 1 18.358 1.33 18.541 1.52L19.433 6.1H4.564L5.435 1.62C5.616 1.35 6.04 1 6.383 1H17.616Z" fill="currentColor"/>
    </svg>
  )
}
