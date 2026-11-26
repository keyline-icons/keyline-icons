import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareUser({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2L18 2C20.2092 2 22 3.7909 22 6L22 18C22 20.2092 20.2092 22 18 22L6 22C3.7909 22 2 20.2092 2 18L2 6C2 3.7909 3.7909 2 6 2ZM14.1213 11.1213C14.6631 10.5795 15 9.8282 15 9C15 7.3432 13.6569 6 12 6C10.3431 6 9 7.3432 9 9C9 10.6569 10.3431 12 12 12C12.8282 12 13.5795 11.6631 14.1213 11.1213ZM6 20L18 20L18 19C18 16.2386 15.7614 14 13 14L11 14C8.2386 14 6 16.2386 6 19Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
