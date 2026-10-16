import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HatGlasses({ size = 24, ...props }: IconProps) {
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
      <path d="M4.2792 9L6.0513 3.6838C6.1874 3.2754 6.5696 3 7 3L10 3C10.2164 3 10.4269 3.0702 10.6 3.2L12 4.25L13.4 3.2C13.5731 3.0702 13.7836 3 14 3L17 3C17.4304 3 17.8126 3.2754 17.9487 3.6838L19.7208 9L23 9L23 11L1 11L1 9L4.2792 9Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M11 17C11 19.2091 9.2091 21 7 21C4.7909 21 3 19.2091 3 17C3 14.7909 4.7909 13 7 13C9.2091 13 11 14.7909 11 17ZM21 17C21 19.2091 19.2091 21 17 21C14.7909 21 13 19.2091 13 17C13 14.7909 14.7909 13 17 13C19.2091 13 21 14.7909 21 17Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M10 17C10 15.8954 10.8954 15 12 15C13.1046 15 14 15.8954 14 17"/>
    </svg>
  )
}
