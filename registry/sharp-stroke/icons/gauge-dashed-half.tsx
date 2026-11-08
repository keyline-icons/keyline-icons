import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GaugeDashedHalf({ size = 24, ...props }: IconProps) {
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
      <path d="M11 22H12C17.523 22 22 17.52 22 12C22 6.48 17.523 2 12 2H11M12 13V6M7.719 21.06L7.199 20.77C6.084 20.16 5.096 19.35 4.287 18.37L3.987 18M2.336 14.7L2.18 13.89C2.06 13.27 2 12.63 2 12C2 11.37 2.06 10.73 2.18 10.11L2.336 9.3M3.987 6L4.287 5.63C5.096 4.65 6.084 3.84 7.199 3.23L7.719 2.94"/>
      <path d="M14 12C14 13.11 13.105 14 12 14C10.895 14 10 13.11 10 12C10 10.9 10.895 10 12 10C13.105 10 14 10.9 14 12ZM7 12C7 12.55 6.552 13 6 13C5.448 13 5 12.55 5 12C5 11.45 5.448 11 6 11C6.552 11 7 11.45 7 12ZM8.757 7.76C8.757 8.31 8.31 8.76 7.757 8.76C7.205 8.76 6.757 8.31 6.757 7.76C6.757 7.21 7.205 6.76 7.757 6.76C8.31 6.76 8.757 7.21 8.757 7.76ZM17.243 7.76C17.243 8.31 16.795 8.76 16.243 8.76C15.69 8.76 15.243 8.31 15.243 7.76C15.243 7.21 15.69 6.76 16.243 6.76C16.795 6.76 17.243 7.21 17.243 7.76ZM19 12C19 12.55 18.552 13 18 13C17.448 13 17 12.55 17 12C17 11.45 17.448 11 18 11C18.552 11 19 11.45 19 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
