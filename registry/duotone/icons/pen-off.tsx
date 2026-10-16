import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PenOff({ size = 24, ...props }: IconProps) {
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
      <path d="M15.0641 15.0641L10.5639 19.5644C10.4681 19.6602 10.3539 19.7355 10.2281 19.7858L2.3714 22.9285C2.2533 22.9757 2.1272 23 2 23C1.4477 23 1 22.5523 1 22C1 21.8728 1.0243 21.7467 1.0715 21.6286L4.2142 13.7719C4.2645 13.6461 4.3398 13.5319 4.4356 13.4361L8.9359 8.9359Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M17.1854 11.5286L21.0237 7.6904C21.6488 7.0652 22 6.2174 22 5.3333C22 4.4493 21.6488 3.6014 21.0237 2.9763C20.3986 2.3512 19.5507 2 18.6667 2C17.7826 2 16.9348 2.3512 16.3096 2.9763L12.4714 6.8146M15.0638 4.2222L19.7778 8.9362" strokeOpacity="0.4"/>
      <path d="M2 2L22 22"/>
    </svg>
  )
}
