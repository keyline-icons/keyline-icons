import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ScanBox({ size = 24, ...props }: IconProps) {
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
      <path d="M3 9V3H9M15 3H21V9M21 15V21H15M9 21H3V15" strokeOpacity="0.4"/>
      <path d="M14.936 7.312L17.436 8.524C17.781 8.691 18 9.041 18 9.424V14.576C18 14.959 17.781 15.309 17.436 15.476L12.436 17.9C12.3 17.966 12.151 18 12 18C11.849 18 11.7 17.966 11.564 17.9L6.564 15.476C6.219 15.309 6 14.959 6 14.576V9.424C6 9.041 6.219 8.691 6.564 8.524L11.564 6.1C11.7 6.034 11.849 6 12 6C12.151 6 12.3 6.034 12.436 6.1L14.936 7.312Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 10.034V9.424C6 9.041 6.219 8.691 6.564 8.524L11.564 6.1C11.7 6.034 11.849 6 12 6C12.151 6 12.3 6.034 12.436 6.1L14.936 7.312L17.436 8.524C17.781 8.691 18 9.041 18 9.424V10.034L12.458 12.889C12.316 12.962 12.159 13 12 13C11.841 13 11.684 12.962 11.542 12.889L6 10.034Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
