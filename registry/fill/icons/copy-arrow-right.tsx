import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CopyArrowRight({ size = 24, ...props }: IconProps) {
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
      <path d="M15.8284 4C15.4046 2.8015 14.2714 2 13 2H5C3.34315 2 2 3.34315 2 5V13C2 14.2714 2.8015 15.4046 4 15.8284"/>
      <path d="M11 7L19 7C21.2091 7 23 8.7909 23 11L23 19C23 21.2091 21.2091 23 19 23L11 23C8.7909 23 7 21.2091 7 19L7 11C7 8.7909 8.7909 7 11 7ZM15.5828 16.001L14.2919 17.2919C13.9009 17.683 13.9009 18.317 14.2919 18.7081C14.683 19.0991 15.317 19.0991 15.7081 18.7081L18.7081 15.7081C19.0991 15.317 19.0991 14.683 18.7081 14.2919L17.2081 12.7919L15.7081 11.2919C15.317 10.9009 14.683 10.9009 14.2919 11.2919C13.9009 11.683 13.9009 12.317 14.2919 12.7081L15.5839 13.999L15 13.999L12 13.999C11.4471 13.999 10.999 14.4471 10.999 15C10.999 15.5529 11.4471 16.001 12 16.001Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
