import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Grape({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M9.5 12.66C8.963 13.47 8.044 14 7 14C5.343 14 4 12.66 4 11C4 9.34 5.343 8 7 8C8.044 8 8.963 8.53 9.5 9.34M14.5 9.34C15.037 8.53 15.956 8 17 8C18.657 8 20 9.34 20 11C20 12.66 18.657 14 17 14C15.956 14 15.037 13.47 14.5 12.66M12 8C10.343 8 9 9.34 9 11C9 12.66 10.343 14 12 14C13.657 14 15 12.66 15 11C15 9.34 13.657 8 12 8ZM12 8V2H17M12 16.66C11.463 17.47 10.544 18 9.5 18C7.843 18 6.5 16.66 6.5 15C6.5 14.64 6.562 14.3 6.677 13.98M17.323 13.98C17.438 14.3 17.5 14.64 17.5 15C17.5 16.66 16.157 18 14.5 18C12.843 18 11.5 16.66 11.5 15C11.5 14.64 11.562 14.3 11.677 13.98M14.823 17.98C14.938 18.3 15 18.64 15 19C15 20.66 13.657 22 12 22C10.343 22 9 20.66 9 19C9 18.64 9.062 18.3 9.177 17.98"/>
    </svg>
  )
}
