import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Hospital({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M18 2C18.552 2 19 2.45 19 3V9H22C22.552 9 23 9.45 23 10V21C23 21.55 22.552 22 22 22H2C1.448 22 1 21.55 1 21V10C1 9.45 1.448 9 2 9H5V3C5 2.45 5.448 2 6 2H18Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M12 15C13.105 15 14 15.9 14 17V20H10V17C10 15.9 10.895 15 12 15ZM12.625 6C12.901 6 13.125 6.22 13.125 6.5V7.38C13.125 7.65 13.349 7.88 13.625 7.88H14.5C14.776 7.88 15 8.1 15 8.38V9.62C15 9.9 14.776 10.12 14.5 10.12H13.625C13.349 10.12 13.125 10.35 13.125 10.62V11.5C13.125 11.78 12.901 12 12.625 12H11.375C11.099 12 10.875 11.78 10.875 11.5V10.62C10.875 10.35 10.651 10.12 10.375 10.12H9.5C9.224 10.12 9 9.9 9 9.62V8.38C9 8.1 9.224 7.88 9.5 7.88H10.375C10.651 7.88 10.875 7.65 10.875 7.38V6.5C10.875 6.22 11.099 6 11.375 6H12.625Z" fill="currentColor"/>
    </svg>
  )
}
