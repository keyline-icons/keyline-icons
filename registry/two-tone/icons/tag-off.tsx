import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TagOff({ size = 24, ...props }: IconProps) {
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
      <path d="M6.293 17.707L10.707 22.121C11.879 23.293 13.778 23.293 14.95 22.121L22.121 14.95C23.293 13.778 23.293 11.879 22.121 10.707L17.707 6.293L6.293 17.707ZM4.879 14.879L14.879 4.879C15.06 4.698 15.172 4.448 15.172 4.172C15.172 3.895 15.06 3.645 14.879 3.464L13.293 1.879C12.73 1.316 11.967 1 11.172 1H5C2.791 1 1 2.791 1 5V11.172C1 11.967 1.316 12.73 1.879 13.293L3.464 14.879C3.645 15.06 3.895 15.172 4.172 15.172C4.448 15.172 4.698 15.06 4.879 14.879Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M17 7L21.414 11.414C22.195 12.195 22.195 13.462 21.414 14.243L14.243 21.414C13.462 22.195 12.195 22.195 11.414 21.414L7 17M22 2L2 22"/>
      <path d="M9.5 8C9.5 8.828 8.828 9.5 8 9.5C7.172 9.5 6.5 8.828 6.5 8C6.5 7.172 7.172 6.5 8 6.5C8.828 6.5 9.5 7.172 9.5 8Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
