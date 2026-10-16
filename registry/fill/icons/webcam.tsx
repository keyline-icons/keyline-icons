import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Webcam({ size = 24, ...props }: IconProps) {
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
      <path d="M3 7C3 3.6863 5.6863 1 9 1L15 1C18.3137 1 21 3.6863 21 7L21 13C21 16.3137 18.3137 19 15 19L9 19C5.6863 19 3 16.3137 3 13L3 7ZM16 10C16 7.7909 14.2091 6 12 6C9.7909 6 8 7.7909 8 10C8 12.2091 9.7909 14 12 14C14.2091 14 16 12.2091 16 10ZM14 10C14 11.1046 13.1046 12 12 12C10.8954 12 10 11.1046 10 10C10 8.8954 10.8954 8 12 8C13.1046 8 14 8.8954 14 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M12 18L12 22M6 22L18 22" fill="none"/>
    </svg>
  )
}
