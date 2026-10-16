import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleArrowUpLeft({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1ZM9.5 8C8.67157 8 8 8.67157 8 9.5V15C8 15.5523 8.44772 16 9 16C9.55229 16 10 15.5523 10 15V11.4141L14.293 15.707C14.6835 16.0976 15.3165 16.0976 15.707 15.707C16.0976 15.3165 16.0976 14.6835 15.707 14.293L11.4141 10H15C15.5523 10 16 9.55229 16 9C16 8.44772 15.5523 8 15 8H9.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
