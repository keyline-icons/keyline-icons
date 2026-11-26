import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GaugeAlert({ size = 24, ...props }: IconProps) {
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
      <path d="M13.111 21.938C12.742 21.979 12.371 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 12.371 21.979 12.742 21.938 13.111" strokeOpacity="0.4"/>
      <path d="M12 12V6M19 15V19"/>
      <path d="M14 12C14 13.105 13.105 14 12 14C10.895 14 10 13.105 10 12C10 10.895 10.895 10 12 10C13.105 10 14 10.895 14 12ZM7 12C7 12.552 6.552 13 6 13C5.448 13 5 12.552 5 12C5 11.448 5.448 11 6 11C6.552 11 7 11.448 7 12ZM8.757 7.757C8.757 8.31 8.31 8.757 7.757 8.757C7.205 8.757 6.757 8.31 6.757 7.757C6.757 7.205 7.205 6.757 7.757 6.757C8.31 6.757 8.757 7.205 8.757 7.757ZM17.243 7.757C17.243 8.31 16.795 8.757 16.243 8.757C15.69 8.757 15.243 8.31 15.243 7.757C15.243 7.205 15.69 6.757 16.243 6.757C16.795 6.757 17.243 7.205 17.243 7.757ZM19 12C19 12.552 18.552 13 18 13C17.448 13 17 12.552 17 12C17 11.448 17.448 11 18 11C18.552 11 19 11.448 19 12ZM20 22C20 22.552 19.552 23 19 23C18.448 23 18 22.552 18 22C18 21.448 18.448 21 19 21C19.552 21 20 21.448 20 22Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
