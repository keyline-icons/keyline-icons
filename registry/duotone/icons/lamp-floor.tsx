import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LampFloor({ size = 24, ...props }: IconProps) {
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
      <path d="M12 12V22M9 22H15" strokeOpacity="0.4"/>
      <path d="M13.4199 1C14.137 1 14.8 1.384 15.1562 2.007L19.7344 10.007C20.4973 11.34 19.534 13 17.998 13H6.0019C4.4659 13 3.5026 11.34 4.2656 10.007L8.8437 2.007C9.2 1.384 9.8629 1 10.5801 1H13.4199Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
