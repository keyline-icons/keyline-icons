import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SoapDispenserDroplet({ size = 24, ...props }: IconProps) {
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
      <path d="M7 11L4 11L4 22L11 22M7 11L7 7L13 7L13 11ZM10 2L10 7M6 2L11.1716 2C12.9826 2 14.7194 2.7194 16 4L16.7071 4.7071M19.35 16.8C19.7719 17.3626 20 18.0468 20 18.75C20 20.5449 18.5449 22 16.75 22C14.9551 22 13.5 20.5449 13.5 18.75C13.5 18.0468 13.7281 17.3626 14.15 16.8L16.75 13.3333Z" fill="none"/>
    </svg>
  )
}
