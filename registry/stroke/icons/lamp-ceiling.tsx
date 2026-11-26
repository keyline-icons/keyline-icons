import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LampCeiling({ size = 24, ...props }: IconProps) {
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
      <path d="M9 2L15 2M12 2L12 10M7.7035 10.449C7.8886 10.168 8.202 10 8.5378 10L15.4622 10C15.798 10 16.1114 10.168 16.2965 10.449L19.7489 15.673C20.4079 16.67 19.6928 18 18.4975 18L5.5025 18C4.3072 18 3.5921 16.67 4.2511 15.673L7.7035 10.449ZM8 18C8 20.2091 9.7909 22 12 22C14.2091 22 16 20.2091 16 18"/>
    </svg>
  )
}
