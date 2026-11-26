import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TouchpadMouseOff({ size = 24, ...props }: IconProps) {
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
      <path d="M21.5355 21.5355C20.6318 22.4392 19.3804 23 18 23C15.2386 23 13 20.7614 13 18L13 14C13 13.687 13.0288 13.3808 13.0838 13.0838ZM21.2929 17.0502L15.4164 11.1737C15.2354 10.9928 15.1235 10.7428 15.1235 10.4666C15.1235 10.0841 15.3382 9.7518 15.6537 9.5837L15.6223 9.6004C15.6345 9.5938 15.6467 9.5872 15.659 9.5807C16.3574 9.21 17.1542 9 18 9C20.7614 9 23 11.2386 23 14L23 16.3431C23 16.8954 22.5523 17.3431 22 17.3431C21.7239 17.3431 21.4739 17.2312 21.2929 17.0502Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M10 16L5 16C3.3431 16 2 14.6569 2 13L2 5C2 4.1715 2.3358 3.4215 2.8787 2.8787M7.6569 2L17 2C18.6569 2 20 3.3431 20 5L20 6" strokeOpacity="0.4"/>
      <path d="M2 2L22 22"/>
    </svg>
  )
}
