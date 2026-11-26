import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Piano({ size = 24, ...props }: IconProps) {
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
      <path d="M12 3H19C21.2092 3 23 4.791 23 7V17C23 19.209 21.2092 21 19 21H5C2.7908 21 1 19.209 1 17V7C1 4.791 2.7908 3 5 3H12Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M17.9881 21H14.012C14.5588 20.994 15 20.548 15 20V13.732C15 13.375 14.8096 13.045 14.5004 12.867C14.2013 12.694 14 12.37 14 12V6C14 5.448 14.4477 5 15 5H17C17.5523 5 18 5.448 18 6V12C18 12.37 17.7987 12.694 17.4996 12.867C17.1904 13.045 17 13.375 17 13.732V20C17 20.548 17.4413 20.994 17.9881 21ZM9.9881 21H6.012C6.5588 20.994 7 20.548 7 20V13.732C7 13.375 6.8096 13.045 6.5004 12.867C6.2013 12.694 6 12.37 6 12V6C6 5.448 6.4477 5 7 5H9C9.5523 5 10 5.448 10 6V12C10 12.37 9.7987 12.694 9.4996 12.867C9.1904 13.045 9 13.375 9 13.732V20C9 20.548 9.4413 20.994 9.9881 21Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
