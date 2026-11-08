import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function School({ size = 24, ...props }: IconProps) {
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
      <path d="M11.517 1.1C11.83 0.96 12.262 0.96 12.555 1.15L18.555 5.15C18.832 5.34 19 5.65 19 5.99V6.99H22C22.552 6.99 23 7.44 23 7.99V22C22.999 22.55 22.552 23 22 23H2C1.483 23 1.052 22.56 1 22.05V7.99C1 7.44 1.448 6.99 2 6.99H5V6.01C5 5.67 5.167 5.36 5.443 5.17L11.517 1.1ZM12 16C10.896 16 10 16.89 10 18V21H14V18C14 16.89 13.104 16 12 16ZM5 16V19H7V16H5ZM17 16V19H19V16H17ZM5 10.99V13.99H7V10.99H5ZM17 10.99V13.99H19V10.99H17ZM12 6.99C10.343 6.99 9 8.33 9 9.99C9.001 11.65 10.344 12.99 12 12.99C13.656 12.99 14.999 11.65 15 9.99C15 8.33 13.657 6.99 12 6.99Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
