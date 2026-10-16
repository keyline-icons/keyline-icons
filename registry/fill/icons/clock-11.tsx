import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Clock11({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C18.0751 1 23 5.9249 23 12C23 18.0751 18.0751 23 12 23C5.9249 23 1 18.0751 1 12C1 5.9249 5.9249 1 12 1ZM13 6C13 5.4477 12.5523 5 12 5C11.4477 5 11 5.4477 11 6L11 8.268L10.366 7.1699C10.0899 6.6916 9.4783 6.5277 9 6.8039C8.5217 7.08 8.3578 7.6916 8.634 8.1699L11.134 12.5C11.3603 12.892 11.8216 13.0831 12.2588 12.9659C12.696 12.8488 13 12.4526 13 12L13 6Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
