import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HockeyPuck({ size = 24, ...props }: IconProps) {
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
      <path d="M19.4424 18.7569C17.4878 19.5388 14.8561 20 12 20C9.1439 20 6.5122 19.5388 4.5576 18.7569C3.583 18.3671 2.7272 17.8779 2.0988 17.2835C1.4682 16.6872 1 15.9158 1 15L1 9C1 8.0842 1.4682 7.3128 2.0988 6.7165C2.7272 6.1221 3.583 5.6329 4.5576 5.2431C6.5122 4.4612 9.1439 4 12 4C14.8561 4 17.4878 4.4612 19.4424 5.2431C20.417 5.6329 21.2728 6.1221 21.9012 6.7165C22.5318 7.3128 23 8.0842 23 9L23 15C23 15.9158 22.5318 16.6872 21.9012 17.2835C21.2728 17.8779 20.417 18.3671 19.4424 18.7569Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M22 9C22 11.2091 17.5228 13 12 13C6.4772 13 2 11.2091 2 9C2 6.7909 6.4772 5 12 5C17.5228 5 22 6.7909 22 9ZM2 9L2 15C2 17.2091 6.4772 19 12 19C17.5228 19 22 17.2091 22 15L22 9"/>
    </svg>
  )
}
