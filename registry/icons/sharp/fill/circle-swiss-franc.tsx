import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleSwissFranc({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C17.9372 1 23 6.0628 23 12C23 17.9372 17.9372 23 12 23C6.0628 23 1 17.9372 1 12C1 6.0628 6.0628 1 12 1ZM16.5 7L16.5 5L9.5 5C8.9477 5 8.5 5.4477 8.5 6L8.5 9L8.5 11L8.5 13L7.5 13L7.5 15L8.5 15L8.5 19L10.5 19L10.5 15L15 15L15 13L10.5 13L10.5 11L16 11L16 9L10.5 9L10.5 7L16.5 7Z" fill="currentColor"/>
    </svg>
  )
}
