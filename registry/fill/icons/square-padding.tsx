import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquarePadding({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2L18 2C20.2092 2 22 3.7908 22 6L22 18C22 20.2092 20.2092 22 18 22L6 22C3.7908 22 2 20.2092 2 18L2 6C2 3.7908 3.7908 2 6 2ZM10.5 6C9.9477 6 9.5 6.4477 9.5 7C9.5 7.5523 9.9477 8 10.5 8L13.5 8C14.0523 8 14.5 7.5523 14.5 7C14.5 6.4477 14.0523 6 13.5 6ZM18 10.5C18 9.9477 17.5523 9.5 17 9.5C16.4477 9.5 16 9.9477 16 10.5L16 13.5C16 14.0523 16.4477 14.5 17 14.5C17.5523 14.5 18 14.0523 18 13.5ZM10.5 16C9.9477 16 9.5 16.4477 9.5 17C9.5 17.5523 9.9477 18 10.5 18L13.5 18C14.0523 18 14.5 17.5523 14.5 17C14.5 16.4477 14.0523 16 13.5 16ZM8 10.5C8 9.9477 7.5523 9.5 7 9.5C6.4477 9.5 6 9.9477 6 10.5L6 13.5C6 14.0523 6.4477 14.5 7 14.5C7.5523 14.5 8 14.0523 8 13.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
