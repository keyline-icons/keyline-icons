import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RocketVerticalOff({ size = 24, ...props }: IconProps) {
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
      <path d="M8.1766 8.1766C7.971 9.0879 7.865 10.0255 7.865 10.9735C7.865 11.6931 7.9261 12.4114 8.0477 13.1206L5.2929 15.8754C5.1054 16.063 5 16.3173 5 16.5825C5 16.7091 5.0241 16.8344 5.0708 16.952L6.8274 21.3694C6.9788 21.7501 7.347 21.9999 7.7566 21.9999C8.0218 21.9999 8.2762 21.8945 8.4637 21.707L9.3652 20.8056L14.6348 20.8056L15.5363 21.707C15.7238 21.8945 15.9782 21.9999 16.2434 21.9999C16.653 21.9999 17.0212 21.7501 17.1726 21.3694L18.3667 18.3667M14.6348 20.8056L15.5379 15.5379M9.3652 20.8056L8.0477 13.1206M16.125 10.4681C16.0045 7.4393 14.8042 4.5467 12.7322 2.319C12.543 2.1156 12.2778 2 12 2C11.7222 2 11.457 2.1156 11.2678 2.319C10.7302 2.897 10.2513 3.5197 9.8348 4.1779M2 2L22 22" fill="none"/>
    </svg>
  )
}
