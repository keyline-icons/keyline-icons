import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GreaterThanEqual({ size = 24, ...props }: IconProps) {
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
      <path d="M7.1522 4.47C7.445 4 8.0619 3.86 8.5301 4.15L16.5301 9.15C16.8223 9.33 16.9999 9.66 16.9999 10C16.9999 10.34 16.8223 10.66 16.5301 10.85L8.5301 15.85C8.0619 16.14 7.445 16 7.1522 15.53C6.8596 15.06 7.0015 14.45 7.4696 14.15L14.1131 10L7.4696 5.85C7.0015 5.55 6.8596 4.94 7.1522 4.47Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M16 18C16.5523 18 17 18.45 17 19C17 19.55 16.5523 20 16 20H8C7.4477 20 7 19.55 7 19C7 18.45 7.4477 18 8 18H16Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
