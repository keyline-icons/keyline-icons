import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareSearch({ size = 24, ...props }: IconProps) {
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
      <path d="M2 6C2 3.7909 3.7909 2 6 2H18C20.2091 2 22 3.7909 22 6V18C22 20.2091 20.2091 22 18 22H6C3.7909 22 2 20.2091 2 18V6ZM13.3076 14.7218L15.5355 16.9497C15.926 17.3402 16.5592 17.3402 16.9497 16.9497C17.3402 16.5592 17.3402 15.926 16.9497 15.5355L14.7218 13.3076C15.1246 12.653 15.357 11.8822 15.357 11.0572C15.357 8.6824 13.4319 6.7574 11.0572 6.7574C9.8701 6.7574 8.7938 7.2397 8.0168 8.0168C7.2397 8.7938 6.7574 9.8701 6.7574 11.0572C6.7574 13.4319 8.6824 15.357 11.0572 15.357C11.8822 15.357 12.653 15.1246 13.3076 14.7218Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
