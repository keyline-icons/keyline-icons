import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function NavigationLine({ size = 24, ...props }: IconProps) {
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
      <path d="M10.7016 9.81C11.1599 8.89 12.3388 8.75 13.0146 9.4L13.1447 9.54L13.1505 9.54L13.2601 9.7L13.2679 9.71L13.308 9.79C13.3097 9.79 13.3122 9.8 13.3149 9.8L18.8917 20.94C19.3539 22.08 18.2905 23.32 17.0937 22.92L12.0716 21.25C12.0511 21.24 12.0293 21.24 12.008 21.24L11.9454 21.25L6.9262 22.92C5.6901 23.33 4.5727 22.05 5.1546 20.88L10.7016 9.81Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M12.0095 1C12.5627 1 13.0112 1.45 13.0112 2V6C13.0112 6.55 12.5627 7 12.0095 7C11.4563 7 11.0078 6.55 11.0078 6V2C11.0078 1.45 11.4563 1 12.0095 1Z" fill="currentColor"/>
    </svg>
  )
}
