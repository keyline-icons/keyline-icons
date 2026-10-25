import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MountainSnow({ size = 24, ...props }: IconProps) {
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
      <path d="M2.1335 18.5033L6.2852 11.249C6.6314 10.644 7.475 10.57 7.9213 11.1056L8.4605 11.7526C8.9373 12.3248 9.8498 12.1937 10.1462 11.5104L13.1429 4.602C13.4816 3.8214 14.5785 3.7935 14.9563 4.5559L21.8947 18.5559C22.2242 19.2206 21.7406 20 20.9987 20L3.0015 20C2.2334 20 1.752 19.1699 2.1335 18.5033ZM10.3913 10.9454C10.8601 10.7215 12.2136 10.0874 13.5 10.5C15.835 11.249 16.6284 9.8895 17.3651 9.4163" fill="none"/>
    </svg>
  )
}
