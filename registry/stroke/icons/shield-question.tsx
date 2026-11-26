import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ShieldQuestion({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M9.6 9.9C9.6 8.575 10.674 7.5 12 7.5C13.326 7.5 14.4 8.575 14.4 9.9C14.4 10.869 13.817 11.743 12.923 12.115C12.364 12.348 12 12.894 12 13.5M5.183 5.168C7.83 4.854 9.83 3.532 11.024 2.373C11.537 1.876 12.463 1.876 12.976 2.373C14.17 3.532 16.17 4.854 18.817 5.168C19.467 5.246 20 5.751 20 6.383V12.571C20 14.345 19.711 16.151 18.612 17.573C17.41 19.128 15.503 20.87 12.83 21.853C12.294 22.049 11.706 22.049 11.17 21.853C8.497 20.87 6.59 19.128 5.388 17.573C4.289 16.151 4 14.345 4 12.571V6.383C4 5.751 4.533 5.246 5.183 5.168Z"/>
      <path d="M13 17.5C13 18.052 12.552 18.5 12 18.5C11.448 18.5 11 18.052 11 17.5C11 16.948 11.448 16.5 12 16.5C12.552 16.5 13 16.948 13 17.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
