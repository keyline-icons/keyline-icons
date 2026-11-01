import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MouseOff({ size = 24, ...props }: IconProps) {
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
      <path d="M18.2181 18.2181C17.0152 20.5419 14.6167 22.0007 12 22C8.134 22 5 18.866 5 15L5 9C4.9983 7.8801 5.2665 6.7762 5.7819 5.7819L18.2181 18.2181ZM8.8472 2.7485C9.8248 2.2555 10.9045 1.9986 11.9995 1.9986C15.8661 1.9986 19.0005 5.1334 19 9L19 12.3431L18.98 12.3431C18.9802 12.8844 18.5415 13.3233 18.0002 13.3233C17.7402 13.3233 17.4908 13.22 17.3071 13.0361L17.2929 13.0503L8.5911 4.3484L8.6052 4.3343C8.4214 4.1505 8.3181 3.9011 8.3181 3.6412C8.3181 3.2714 8.5262 2.9331 8.8562 2.7664L8.8472 2.7485Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M17.4697 17.4697C16.5283 19.5515 14.4333 21 12 21C8.6863 21 6 18.3137 6 15L6 9C6 8.1196 6.1896 7.2835 6.5303 6.5303M2 2L22 22" fill="none"/>
    </svg>
  )
}
