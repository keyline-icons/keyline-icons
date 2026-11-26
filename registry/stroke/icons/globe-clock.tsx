import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GlobeClock({ size = 24, ...props }: IconProps) {
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
      <path d="M8 21.1652C4.3557 19.5747 2 15.9762 2 12C2 6.4772 6.4772 2 12 2C15.9762 2 19.5747 4.3557 21.1652 8M2 12L8 12M12 2C9.3333 5 8 8.5 8 12M12 2C13.3827 3.5555 14.4069 5.2454 15.0726 7M22 16.5C22 19.5376 19.5376 22 16.5 22C13.4624 22 11 19.5376 11 16.5C11 13.4624 13.4624 11 16.5 11C19.5376 11 22 13.4624 22 16.5ZM16 15.1L16 17L17.9 17"/>
    </svg>
  )
}
