import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Sunglasses({ size = 24, ...props }: IconProps) {
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
      <path d="M14.2127 15.9743L15.3334 19L22 19L22 13L14.5479 13C13.8514 13 13.3682 13.6942 13.6101 14.3473ZM9.7873 15.9743L8.6666 19L2 19L2 13L9.4521 13C10.1486 13 10.6318 13.6942 10.3899 14.3473ZM2 13.5L4.2924 7.6512C4.7424 6.601 5.6202 5.7933 6.7041 5.432L8 5L8.154 4.9487M22 13.5L19.7076 7.6512C19.2576 6.601 18.3798 5.7933 17.2959 5.432L16 5L15.846 4.9487M14.2127 15.9743C13.1111 15 10.8889 15 9.7873 15.9743"/>
    </svg>
  )
}
