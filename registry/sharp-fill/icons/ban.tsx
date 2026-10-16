import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Ban({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C17.9372 1 23 6.0628 23 12C23 17.9372 17.9372 23 12 23C6.0628 23 1 17.9372 1 12C1 6.0628 6.0628 1 12 1ZM4.9289 6.3431L17.6569 19.0711L19.0711 17.6569L6.3431 4.9289L4.9289 6.3431Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
