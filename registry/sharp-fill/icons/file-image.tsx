import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FileImage({ size = 24, ...props }: IconProps) {
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
      <path d="M14 1C14.2652 1 14.5196 1.1054 14.7071 1.2929L20.7071 7.2929C20.8946 7.4804 21 7.7348 21 8L21 22C21 22.5523 20.5523 23 20 23L4 23C3.4477 23 3 22.5523 3 22L3 2C3 1.4477 3.4477 1 4 1L14 1ZM14 8L18.5858 8L14 3.4142L14 8ZM5 17L9.4903 12.5097C9.7947 12.2053 10.2596 12.1299 10.6446 12.3224L19 16.5L19 20C19 20.5523 18.5523 21 18 21L6 21C5.4477 21 5 20.5523 5 20L5 17ZM10.5 7C10.5 6.1716 9.8284 5.5 9 5.5C8.1716 5.5 7.5 6.1716 7.5 7C7.5 7.8284 8.1716 8.5 9 8.5C9.8284 8.5 10.5 7.8284 10.5 7Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
