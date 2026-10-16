import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Mouse({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2C15.866 2 19 5.134 19 9L19 15C19 18.866 15.866 22 12 22C8.134 22 5 18.866 5 15L5 9C5 5.134 8.134 2 12 2ZM13 7C13 6.4477 12.5523 6 12 6C11.4477 6 11 6.4477 11 7L11 8C11 8.5523 11.4477 9 12 9C12.5523 9 13 8.5523 13 8L13 7Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
