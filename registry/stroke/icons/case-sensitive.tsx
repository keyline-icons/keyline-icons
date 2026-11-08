import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CaseSensitive({ size = 24, ...props }: IconProps) {
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
      <path d="M2 18.001L3.7857 13.001L6.0583 6.668C6.3743 5.783 7.6257 5.783 7.9417 6.668L10.2143 13.001L12 18.001M10.2143 13.001H3.7857M22 15.001C22 16.658 20.6569 18.001 19 18.001C17.3431 18.001 16 16.658 16 15.001C16 13.344 17.3431 12.001 19 12.001C20.6569 12.001 22 13.344 22 15.001ZM22 15.001V11.001M22 15.001V18.001"/>
    </svg>
  )
}
