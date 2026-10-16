import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Pen({ size = 24, ...props }: IconProps) {
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
      <path d="M21.7308 8.3975L10.5639 19.5644C10.4681 19.6602 10.3539 19.7355 10.2281 19.7858L2.3714 22.9285C2.2533 22.9757 2.1272 23 2 23C1.4477 23 1 22.5523 1 22C1 21.8728 1.0243 21.7467 1.0715 21.6286L4.2142 13.7719C4.2645 13.6461 4.3398 13.5319 4.4356 13.4361L15.6025 2.2692C16.4152 1.4565 17.5174 1 18.6667 1C19.8159 1 20.9181 1.4565 21.7308 2.2692C22.5435 3.0819 23 4.1841 23 5.3333C23 6.4826 22.5435 7.5848 21.7308 8.3975Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M21.1921 8.9363L10.5639 19.5644C10.4681 19.6602 10.3539 19.7355 10.2281 19.7858L2.3714 22.9285C2.2533 22.9757 2.1272 23 2 23C1.4477 23 1 22.5523 1 22C1 21.8728 1.0243 21.7467 1.0715 21.6286L4.2142 13.7719C4.2645 13.6461 4.3398 13.5319 4.4356 13.4361L15.0638 2.808Z" fill="currentColor"/>
    </svg>
  )
}
