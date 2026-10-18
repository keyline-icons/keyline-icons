import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PlugCircle({ size = 24, ...props }: IconProps) {
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
      <path d="M17.866 20.1603L17 20.6603C15.4798 21.5379 13.7554 22 12 22C6.4772 22 2 17.5228 2 12C2 6.4772 6.4772 2 12 2C17.5228 2 22 6.4772 22 12L22 13C22 14.6569 20.6569 16 19 16C18.2316 16 17.5308 15.7112 17 15.2361M14.3525 7.7528L7.7528 14.3525L9.6384 16.2381C11.4608 18.0606 14.4156 18.0605 16.2381 16.2381C18.0605 14.4156 18.0606 11.4608 16.2381 9.6384L14.3525 7.7528ZM12.4668 9.6384L9.8169 6.9885M9.6384 12.4668L6.9885 9.8169" fill="none"/>
    </svg>
  )
}
