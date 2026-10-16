import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PhoneCall({ size = 24, ...props }: IconProps) {
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
      <path d="M1 4L1 2C1 1.4477 1.4477 1 2 1L9 1C9.5523 1 10 1.4477 10 2L10 8C10 8.3148 9.8518 8.6111 9.6 8.8L8.3388 9.7459C9.6049 12.3156 11.6844 14.3951 14.2541 15.6612L15.2 14.4C15.3889 14.1482 15.6852 14 16 14L22 14C22.5523 14 23 14.4477 23 15L23 22C23 22.5523 22.5523 23 22 23L20 23C9.5066 23 1 14.4934 1 4Z" fill="currentColor" stroke="none"/>
      <path d="M13.3294 4.074L14.0706 4.2726C16.8313 5.0123 18.9877 7.1687 19.7274 9.9294L19.926 10.6706M12.2942 7.9377L13.0353 8.1363C14.4156 8.5062 15.4938 9.5844 15.8637 10.9647L16.0623 11.7058"/>
    </svg>
  )
}
