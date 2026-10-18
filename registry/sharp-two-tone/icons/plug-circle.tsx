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
      <path d="M13.6454 7.0457C13.8329 6.8582 14.0873 6.7528 14.3525 6.7528C14.6177 6.7528 14.8721 6.8582 15.0596 7.0457L16.9452 8.9313C18.0079 9.994 18.6049 11.4353 18.6049 12.9382C18.6049 16.0679 16.0679 18.6049 12.9382 18.6049C11.4353 18.6049 9.994 18.0079 8.9313 16.9452L7.0457 15.0596C6.8582 14.8721 6.7528 14.6177 6.7528 14.3525C6.7528 14.0873 6.8582 13.8329 7.0457 13.6454L13.6454 7.0457Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M17.866 20.1603L17 20.6603C15.4798 21.5379 13.7554 22 12 22C6.4772 22 2 17.5228 2 12C2 6.4772 6.4772 2 12 2C17.5228 2 22 6.4772 22 12L22 13C22 14.6569 20.6569 16 19 16C18.2316 16 17.5308 15.7112 17 15.2361M14.3525 7.7528L7.7528 14.3525L9.6384 16.2381C11.4608 18.0606 14.4156 18.0605 16.2381 16.2381C18.0605 14.4156 18.0606 11.4608 16.2381 9.6384L14.3525 7.7528ZM12.4668 9.6384L9.8169 6.9885M9.6384 12.4668L6.9885 9.8169" fill="none"/>
    </svg>
  )
}
