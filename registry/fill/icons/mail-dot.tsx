import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MailDot({ size = 24, ...props }: IconProps) {
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
      <path d="M2 7C2 5.34315 3.34315 4 5 4H19C20.6569 4 22 5.34315 22 7L12.7071 11C12.2846 11.2817 11.7154 11.2817 11.2929 11ZM23 17C23 19.2091 21.2091 21 19 21C16.7909 21 15 19.2091 15 17C15 14.7909 16.7909 13 19 13C21.2091 13 23 14.7909 23 17ZM19 15C17.8954 15 17 15.8954 17 17C17 18.1046 17.8954 19 19 19C20.1046 19 21 18.1046 21 17C21 15.8954 20.1046 15 19 15Z" fill="currentColor" stroke="none"/>
      <path d="M12 20H5C3.34315 20 2 18.6569 2 17V7C2 5.34315 3.34315 4 5 4H19C20.6569 4 22 5.34315 22 7V10M2 7L11.2929 11C11.7154 11.2817 12.2846 11.2817 12.7071 11L22 7"/>
    </svg>
  )
}
