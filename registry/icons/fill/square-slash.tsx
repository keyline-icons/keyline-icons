import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareSlash({ size = 24, ...props }: IconProps) {
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
      <path d="M2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6ZM15.7071 9.7071C15.8946 9.5196 16 9.2652 16 9C16 8.4477 15.5523 8 15 8C14.7348 8 14.4804 8.1054 14.2929 8.2929L8.2929 14.2929C8.1054 14.4804 8 14.7348 8 15C8 15.5523 8.4477 16 9 16C9.2652 16 9.5196 15.8946 9.7071 15.7071L15.7071 9.7071Z" fill="currentColor"/>
    </svg>
  )
}
