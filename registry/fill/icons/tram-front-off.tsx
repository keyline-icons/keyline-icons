import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TramFrontOff({ size = 24, ...props }: IconProps) {
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
      <path d="M12.432 5L17 5C19.2092 5 21 6.7908 21 9L21 16.7574L15.2426 11L19 11L19 9C19 7.8954 18.1046 7 17 7L11.2426 7L9.2426 5L11.568 5C11.568 4.9922 11.5698 4.9846 11.5733 4.9776L11.9553 4.2137C11.9637 4.1968 11.9811 4.1861 12 4.1861C12.0189 4.1861 12.0363 4.1968 12.0447 4.2137L12.4267 4.9776C12.4302 4.9846 12.432 4.9922 12.432 5ZM19.8284 19.8284C19.0791 20.5798 18.0611 21.0014 17 21L7 21C4.7908 21 3 19.2092 3 17L3 9C2.9997 7.4276 3.9205 6.0008 5.3534 5.3534L7 7C5.8954 7 5 7.8954 5 9L5 11L8.1716 10.9999L10.9999 10.9999L19.8284 19.8284ZM9 16C9 15.4477 8.5523 15 8 15C7.4477 15 7 15.4477 7 16C7 16.5523 7.4477 17 8 17C8.5523 17 9 16.5523 9 16Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M8 20L7 22M16 20L17 22M8 2L16 2M10.5523 4.8954L12 2L14 6M2 2L22 22" fill="none"/>
    </svg>
  )
}
