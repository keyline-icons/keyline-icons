import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ShieldInfo({ size = 24, ...props }: IconProps) {
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
      <path d="M21 10.5434L21 15.778C21 15.9994 20.9265 16.2146 20.7911 16.3897L19.4031 18.1846C18.1145 19.851 16.0642 21.7296 13.1746 22.7912C12.4167 23.0697 11.5833 23.0697 10.8253 22.7911C7.9358 21.7296 5.8855 19.851 4.5969 18.1846L3.2089 16.3895C3.0735 16.2143 3 15.9992 3 15.7778L3 5.3088C3 4.8021 3.379 4.3755 3.8821 4.3158L5.0646 4.1754C7.4429 3.8932 9.2485 2.7026 10.3279 1.6554C11.2286 0.7815 12.7714 0.7815 13.6721 1.6554C14.7515 2.7026 16.5571 3.8932 18.9353 4.1754L20.1179 4.3158C20.621 4.3755 21 4.8021 21 5.3088ZM11 18L13 18L13 10L11 10ZM13 7C13 6.4477 12.5523 6 12 6C11.4477 6 11 6.4477 11 7C11 7.5523 11.4477 8 12 8C12.5523 8 13 7.5523 13 7Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
