import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Triangle({ size = 24, ...props }: IconProps) {
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
      <path d="M8.7328 3.8869C10.2061 1.3716 13.7947 1.3715 15.268 3.8869L22.4623 16.172C23.9502 18.7134 22.1759 21.9998 19.1947 22.0002L4.8061 22.0002C1.8245 22.0001 0.0502 18.7136 1.5385 16.172L8.7328 3.8869Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M14.4051 4.3922C13.3181 2.536 10.6819 2.536 9.5949 4.3922L2.4006 16.6777C1.2854 18.5822 2.6307 21 4.8057 21L19.1943 21C21.3693 21 22.7146 18.5822 21.5994 16.6777L14.4051 4.3922Z" fill="none"/>
    </svg>
  )
}
