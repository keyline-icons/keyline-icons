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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M4.2792 9L5.5955 5.0513C6.0038 3.8263 7.1502 3 8.4415 3L9.3333 3C9.9824 3 10.614 3.2105 11.1333 3.6L11.4 3.8C11.5731 3.9298 11.7836 4 12 4C12.2164 4 12.4269 3.9298 12.6 3.8L12.8667 3.6C13.386 3.2105 14.0176 3 14.6667 3L15.5585 3C16.8498 3 17.9962 3.8263 18.4045 5.0513L19.7208 9L22 9C22.5523 9 23 9.4477 23 10C23 10.5523 22.5523 11 22 11L2 11C1.4477 11 1 10.5523 1 10C1 9.4477 1.4477 9 2 9L4.2792 9ZM11 17C11 19.2091 9.2091 21 7 21C4.7909 21 3 19.2091 3 17C3 14.7909 4.7909 13 7 13C9.2091 13 11 14.7909 11 17ZM21 17C21 19.2091 19.2091 21 17 21C14.7909 21 13 19.2091 13 17C13 14.7909 14.7909 13 17 13C19.2091 13 21 14.7909 21 17Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M10 17C10 15.8954 10.8954 15 12 15C13.1046 15 14 15.8954 14 17"/>
    </svg>
  )
}
