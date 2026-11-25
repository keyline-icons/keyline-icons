import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChartAreaStacked({ size = 24, ...props }: IconProps) {
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
      <path d="M12 22L4 22C2.8954 22 2 21.1046 2 20L2 18.8C2 18.5078 2.1278 18.2301 2.3499 18.0401L10.0642 11.4401C10.2454 11.2852 10.4759 11.2 10.7143 11.2C10.9527 11.2 11.1833 11.2852 11.3644 11.4402L14.5714 14.184L20.3499 9.2401C20.5311 9.0852 20.7616 9 21 9C21.5523 9 22 9.4477 22 10L22 20C22 21.1046 21.1046 22 20 22Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M3 12L10.7143 5.25L14.5714 8.625L21 3" strokeOpacity="0.4"/>
    </svg>
  )
}
