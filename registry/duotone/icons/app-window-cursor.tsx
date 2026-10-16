import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AppWindowCursor({ size = 24, ...props }: IconProps) {
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
      <path d="M11 21H6C4.34315 21 3 19.6569 3 18V6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V11" strokeOpacity="0.4"/>
      <path d="M8 7C8 7.5523 7.5523 8 7 8C6.4477 8 6 7.5523 6 7C6 6.4477 6.4477 6 7 6C7.5523 6 8 6.4477 8 7ZM12 7C12 7.5523 11.5523 8 11 8C10.4477 8 10 7.5523 10 7C10 6.4477 10.4477 6 11 6C11.5523 6 12 6.4477 12 7ZM16 7C16 7.5523 15.5523 8 15 8C14.4477 8 14 7.5523 14 7C14 6.4477 14.4477 6 15 6C15.5523 6 16 6.4477 16 7Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M14.4108 21.0859L12.0623 13.7095C12.0214 13.5808 12.0005 13.4466 12.0005 13.3116C12.0005 12.5873 12.5877 12.0001 13.312 12.0001C13.4528 12.0001 13.5927 12.0228 13.7263 12.0673L21.1024 14.5231C21.6381 14.7014 21.9995 15.2027 21.9995 15.7673C21.9995 16.2974 21.6803 16.7754 21.1907 16.9785L18.2857 18.1837L16.85 21.245C16.6339 21.7059 16.1707 22.0003 15.6616 22.0003C15.09 22.0003 14.5842 21.6305 14.4108 21.0859Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
