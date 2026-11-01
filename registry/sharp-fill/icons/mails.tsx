import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Mails({ size = 24, ...props }: IconProps) {
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
      <path d="M23 13.1774L23 20C23 20.5523 22.5523 21 22 21L6 21C5.4477 21 5 20.5523 5 20L5 13.1774C5 12.6251 5.4477 12.1774 6 12.1774C6.1347 12.1774 6.2679 12.2046 6.3918 12.2574L13.6046 15.362C13.7295 15.4158 13.864 15.4435 14 15.4435C14.136 15.4435 14.2705 15.4158 14.3954 15.362L21.6082 12.2574C21.7321 12.2046 21.8653 12.1774 22 12.1774C22.5523 12.1774 23 12.6251 23 13.1774ZM5 8.8226L5 8C5 7.4477 5.4477 7 6 7L22 7C22.5523 7 23 7.4477 23 8L23 8.8226C23 9.222 22.7623 9.5832 22.3954 9.7411L14 13.3548L5.6046 9.7411C5.2377 9.5832 5 9.222 5 8.8226Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M2 14L2 4L16 4" fill="none"/>
    </svg>
  )
}
