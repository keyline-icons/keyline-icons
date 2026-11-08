import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Warehouse({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C12.165 1 12.461 1.04 12.623 1.06L12.873 1.13L13.217 1.25L21.57 6.74C22.437 7.15 23 8.03 23 9V22C23 22.55 22.552 23 22 23H2C1.448 23 1 22.55 1 22V9C1 8.03 1.568 7.15 2.434 6.74L10.75 1.27C11.096 1.13 11.629 1 12 1Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M17 19V21H7V19H17ZM17 15V17H7V15H17ZM17 11V13H7V11H17Z" fill="currentColor"/>
    </svg>
  )
}
