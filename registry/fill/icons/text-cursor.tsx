import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TextCursor({ size = 24, ...props }: IconProps) {
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
      <path d="M12 4.25C11.5556 3.6875 10.1333 2 8 2M12 4.25C12.4444 3.6875 13.8667 2 16 2M12 4.25L12 19.75M12 19.75C12.4444 20.3125 13.8667 22 16 22M12 19.75C11.5556 20.3125 10.1333 22 8 22" fill="none"/>
    </svg>
  )
}
