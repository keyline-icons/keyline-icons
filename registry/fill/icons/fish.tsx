import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Fish({ size = 24, ...props }: IconProps) {
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
      <path d="M11.5859 4C12.0708 4 12.5394 4.18 12.9043 4.5L17.5078 8.53C19.5002 9.21 21.253 10.52 22.475 12.3C22.817 12.8 23 13.39 23 14C23 14.61 22.817 15.2 22.475 15.7C20.6289 18.39 17.5732 20 14.3076 20C11.9022 20 9.5792 19.12 7.7725 17.54L3.7144 19.09C3.4866 19.18 3.2441 19.22 3 19.22C1.8955 19.22 1.0002 18.33 1 17.22C1 16.67 1.232 16.13 1.6396 15.76L3.5303 14L1.6396 12.24C1.232 11.87 1 11.33 1 10.78C1.0002 9.67 1.8955 8.78 3 8.78C3.2441 8.78 3.4866 8.82 3.7144 8.91L7.7725 10.46C8.0425 10.23 8.3255 10.01 8.6172 9.8L9.6416 5.53C9.8575 4.63 10.6613 4 11.5859 4ZM17 13C16.4477 13 16 13.45 16 14C16 14.55 16.4477 15 17 15C17.5523 15 18 14.55 18 14C18 13.45 17.5523 13 17 13Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
