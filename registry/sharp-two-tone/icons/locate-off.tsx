import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LocateOff({ size = 24, ...props }: IconProps) {
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
      <path d="M16.9498 16.9498C15.6384 18.2646 13.857 19.0024 12 19C8.134 19 5 15.866 5 12C4.9976 10.143 5.7354 8.3616 7.0503 7.0503L16.9498 16.9498ZM13 5.0709C16.0717 5.5154 18.4846 7.9283 18.9291 11L23 11L23 13L18.9291 13C18.845 13.5887 18.6857 14.1643 18.4551 14.7124L9.2876 5.5449C9.8357 5.3143 10.4113 5.155 11 5.0709L11 1L13 1L13 5.0709Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M16.2426 16.2426C15.1569 17.3284 13.6569 18 12 18C8.6863 18 6 15.3137 6 12C6 10.3431 6.6716 8.8431 7.7574 7.7574M12 23L12 18M1 12L6 12M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
