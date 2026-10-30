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
      <path d="M12.1674 23L7 23C4.7908 23 3 21.2092 3 19L3 14C3 11.7908 4.7908 10 7 10L13 10C13.9165 9.9989 14.8053 10.3136 15.517 10.8911C14.8934 11.1257 14.3498 11.5336 13.95 12.0667L11.75 15C10.9386 16.0818 10.4999 17.3977 10.4999 18.75C10.4999 20.3263 11.0955 21.8443 12.1674 23Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 11L6 7.5C6 6.6716 6.6716 6 7.5 6L12.5 6C13.3284 6 14 6.6716 14 7.5L14 11C14 11.5523 13.5523 12 13 12L7 12C6.4477 12 6 11.5523 6 11ZM20.15 16.2C20.7018 16.9357 21 17.8304 21 18.75C21 21.0972 19.0972 23 16.75 23C14.4028 23 12.5 21.0972 12.5 18.75C12.5 17.8304 12.7983 16.9357 13.35 16.2L15.55 13.2667C15.8333 12.889 16.2779 12.6667 16.75 12.6667C17.2221 12.6667 17.6667 12.889 17.95 13.2667L20.15 16.2Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M10 2L10 7M7 2L11.1716 2C12.9826 2 14.7194 2.7194 16 4" fill="none"/>
    </svg>
  )
}
