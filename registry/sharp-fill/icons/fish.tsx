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
      <path d="M11.586 4C12.071 4 12.539 4.18 12.904 4.5L17.508 8.53C19.5 9.21 21.253 10.52 22.475 12.3C22.817 12.8 23 13.39 23 14C23 14.61 22.817 15.2 22.475 15.7C20.629 18.39 17.573 20 14.308 20C11.902 20 9.579 19.12 7.772 17.54L3.714 19.09C3.487 19.18 3.244 19.22 3 19.22C1.896 19.22 1 18.33 1 17.22C1 16.67 1.232 16.13 1.64 15.76L3.53 14L1.64 12.24C1.232 11.87 1 11.33 1 10.78C1 9.67 1.896 8.78 3 8.78C3.244 8.78 3.487 8.82 3.714 8.91L7.772 10.46C8.043 10.23 8.326 10.01 8.617 9.8L9.642 5.53C9.857 4.63 10.661 4 11.586 4ZM17 13C16.448 13 16 13.45 16 14C16 14.55 16.448 15 17 15C17.552 15 18 14.55 18 14C18 13.45 17.552 13 17 13Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
