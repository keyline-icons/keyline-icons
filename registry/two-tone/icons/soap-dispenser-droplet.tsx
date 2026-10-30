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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M6 11L6 7.5C6 6.6716 6.6716 6 7.5 6L12.5 6C13.3284 6 14 6.6716 14 7.5L14 11C14 11.5523 13.5523 12 13 12L7 12C6.4477 12 6 11.5523 6 11ZM20.15 16.2C20.7018 16.9357 21 17.8304 21 18.75C21 21.0972 19.0972 23 16.75 23C14.4028 23 12.5 21.0972 12.5 18.75C12.5 17.8304 12.7983 16.9357 13.35 16.2L15.55 13.2667C15.8333 12.889 16.2779 12.6667 16.75 12.6667C17.2221 12.6667 17.6667 12.889 17.95 13.2667L20.15 16.2Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M7 11C5.3431 11 4 12.3431 4 14L4 19C4 20.6569 5.3431 22 7 22L10 22M7 11L7 7.5C7 7.2239 7.2239 7 7.5 7L12.5 7C12.7761 7 13 7.2239 13 7.5L13 11L7 11ZM10 2L10 7M7 2L11.1716 2C12.9826 2 14.7194 2.7194 16 4M19.35 16.8C19.7719 17.3626 20 18.0468 20 18.75C20 20.5449 18.5449 22 16.75 22C14.9551 22 13.5 20.5449 13.5 18.75C13.5 18.0468 13.7281 17.3626 14.15 16.8L16.35 13.8667C16.4444 13.7408 16.5926 13.6667 16.75 13.6667C16.9074 13.6667 17.0556 13.7408 17.15 13.8667Z" fill="none"/>
    </svg>
  )
}
