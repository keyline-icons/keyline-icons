import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleX({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1ZM16.0777 7.92227C15.6482 7.4927 14.9518 7.49271 14.5223 7.92227L12 10.4445L9.47773 7.92227C9.04816 7.49271 8.35184 7.49269 7.92227 7.92227C7.49271 8.35184 7.49271 9.04816 7.92227 9.47773L10.4445 12L7.92227 14.5223C7.49269 14.9518 7.49269 15.6482 7.92227 16.0777C8.35184 16.5073 9.04816 16.5073 9.47773 16.0777L12 13.5555L14.5223 16.0777C14.9518 16.5073 15.6482 16.5073 16.0777 16.0777C16.5073 15.6482 16.5073 14.9518 16.0777 14.5223L13.5555 12L16.0777 9.47773C16.5073 9.04816 16.5073 8.35184 16.0777 7.92227Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
