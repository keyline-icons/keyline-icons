import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleChevronsLeft({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1 C18.0751 1 23 5.9249 23 12 C23 18.0751 18.0751 23 12 23 C5.9249 23 1 18.0751 1 12 C1 5.9249 5.9249 1 12 1 ZM11.457 7.793 C11.0665 7.4024 10.4335 7.4024 10.043 7.793 L6.543 11.293 C6.1524 11.6835 6.1524 12.3165 6.543 12.707 L10.043 16.207 C10.4335 16.5975 11.0665 16.5975 11.457 16.207 C11.8475 15.8165 11.8475 15.1835 11.457 14.793 L8.6641 12 L11.457 9.207 C11.8475 8.8165 11.8475 8.1835 11.457 7.793 ZM17.457 7.793 C17.0665 7.4024 16.4335 7.4024 16.043 7.793 L12.543 11.293 C12.1524 11.6835 12.1524 12.3165 12.543 12.707 L16.043 16.207 C16.4335 16.5975 17.0665 16.5975 17.457 16.207 C17.8475 15.8165 17.8475 15.1835 17.457 14.793 L14.6641 12 L17.457 9.207 C17.8475 8.8165 17.8475 8.1835 17.457 7.793 Z" fill="currentColor"/>
    </svg>
  )
}
