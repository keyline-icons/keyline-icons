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
      <path d="M16.9498 16.9498C15.6384 18.2646 13.857 19.0024 12 19C8.134 19 5 15.866 5 12C4.9976 10.143 5.7354 8.3616 7.0503 7.0503L16.9498 16.9498ZM9.2274 5.5706C10.1029 5.1929 11.0465 4.9987 12 5C15.866 5 19 8.134 19 12C19.0013 12.9535 18.8071 13.8971 18.4294 14.7726L9.2274 5.5706Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M12 23L12 18M1 12L6 12M12 1L12 6M23 12L18 12M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
