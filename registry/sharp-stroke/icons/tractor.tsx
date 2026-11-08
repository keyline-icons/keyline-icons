import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Tractor({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M11 18C11.628 17.16 12 16.13 12 15C12 13.36 11.215 11.91 10 11M11 18C10.088 19.21 8.636 20 7 20C4.239 20 2 17.76 2 15C2 13.36 2.786 11.91 4 11M11 18H15M10 11C9.165 10.37 8.126 10 7 10C5.874 10 4.836 10.37 4 11M10 11C10.713 10.89 11.378 10.81 12 10.76M4 11V4M12 10.76L10 4H4M12 10.76C14.055 10.58 15.651 10.7 17 10.99M4 4H1M19 18H22V14.85C22 13.72 21.366 12.66 20.34 12.17C19.326 11.69 18.272 11.26 17 10.99M17 10.99V11M17 10.99V8L18.293 6.71M19 18C19 19.1 18.105 20 17 20C15.895 20 15 19.1 15 18C15 16.9 15.895 16 17 16C18.105 16 19 16.9 19 18Z"/>
      <path d="M8.5 15C8.5 15.83 7.828 16.5 7 16.5C6.172 16.5 5.5 15.83 5.5 15C5.5 14.17 6.172 13.5 7 13.5C7.828 13.5 8.5 14.17 8.5 15Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
