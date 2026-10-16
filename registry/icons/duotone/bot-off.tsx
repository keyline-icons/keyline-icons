import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BotOff({ size = 24, ...props }: IconProps) {
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
      <path d="M20.2839 20.2839C19.5362 21.359 18.3095 22 17 22L7 22C4.7909 22 3 20.2091 3 18L3 11C3 8.7909 4.7909 7 7 7L20.2839 20.2839ZM10 13C10 12.4477 9.5523 12 9 12C8.4477 12 8 12.4477 8 13C8 13.5523 8.4477 14 9 14C9.5523 14 10 13.5523 10 13ZM9 16C8.4477 16 8 16.4477 8 17C8 17.5523 8.4477 18 9 18L13 18C13.5523 18 14 17.5523 14 17C14 16.4477 13.5523 16 13 16L9 16ZM2 13.5L3 13.5L3 15.5L2 15.5C1.4477 15.5 1 15.0523 1 14.5C1 13.9477 1.4477 13.5 2 13.5ZM12 7L17 7C19.2091 7 21 8.7909 21 11L21 16C21 16.5523 20.5523 17 20 17C19.7348 17 19.4804 16.8946 19.2929 16.7071L11.2929 8.7071C11.1054 8.5196 11 8.2652 11 8C11 7.4477 11.4477 7 12 7ZM11 3.5L13 3.5L13 7L12 7C11.4477 7 11 7.4477 11 8ZM13.5 3.5C13.5 3.9268 13.3182 4.3335 13 4.618L13 3.5L11 3.5L11 4.618C10.6818 4.3335 10.5 3.9268 10.5 3.5C10.5 2.6716 11.1716 2 12 2C12.8284 2 13.5 2.6716 13.5 3.5ZM21 13.5L22 13.5C22.5523 13.5 23 13.9477 23 14.5C23 15.0523 22.5523 15.5 22 15.5L21 15.5L21 13.5Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 2L22 22"/>
    </svg>
  )
}
